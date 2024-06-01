// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SmartAccount is EIP712 {
    using SafeERC20 for IERC20;

    error InvalidSignature();
    error CallFailed(bytes revertData);
    error DeadlineExpired(uint256 deadline);
    error NonceUsed(uint256 nonce);
    error OnlyThisAddress();
    error OnlyRecipient();
    error SplitNotFound(uint256 splitId);
    error SplitNotPending(uint256 splitId);
    error SplitAmountGreaterThanPending(uint256 splitId);

    event TransactionExecuted(
        uint256 nonce,
        address to,
        uint256 value,
        bytes data,
        uint256 deadline,
        bytes result
    );

    event SplitCreated(
        uint256 splitId,
        address token,
        address to,
        uint256 totalAmount,
        SplitRecipient[] splitRecipients
    );

    event SplitFullfilled(uint256 splitId, address recipient, uint256 amount);

    struct Transaction {
        uint256 nonce;
        address to;
        uint256 value;
        bytes data;
        uint256 deadline;
    }

    struct Split {
        uint256 splitId;
        address token;
        address to;
        uint256 totalAmount;
        SplitRecipientDetails[] splitRecipientsDetails;
    }

    struct SplitRecipientDetails {
        SplitRecipient recipient;
        uint256 amountPaid;
    }

    struct SplitRecipient {
        address recipient;
        uint256 amountToPay;
    }

    struct SplitRequest {
        uint256 splitId;
        address requester;
        uint256 amount;
    }

    address public immutable owner;
    uint256 public totalSplits;
    mapping(uint256 => bool) public nonceUsed;
    mapping(uint256 splitId => Split) public splits;
    SplitRequest[] public splitRequests;

    constructor(address _owner) EIP712("Zorpay", "1") {
        owner = _owner;
    }

    modifier _onlyThisAddress() {
        if (msg.sender != address(this)) {
            revert OnlyThisAddress();
        }
        _;
    }

    function execute(
        Transaction calldata transaction,
        // uint8 v,
        // bytes32 r,
        // bytes32 s
        bytes calldata signature
    ) external payable returns (bytes memory) {
        if (transaction.deadline < block.timestamp) {
            revert DeadlineExpired(transaction.deadline);
        }

        if (nonceUsed[transaction.nonce]) {
            revert NonceUsed(transaction.nonce);
        }

        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256(
                        "Transaction(uint256 nonce,address to,uint256 value,bytes data,uint256 deadline)"
                    ),
                    transaction.nonce,
                    transaction.to,
                    transaction.value,
                    keccak256(transaction.data),
                    transaction.deadline
                )
            )
        );

        if (
            ECDSA.recover(
                digest,
                // v, r, s
                signature
            ) != owner
        ) {
            revert InvalidSignature();
        }
        (bool success, bytes memory result) = transaction.to.call{
            value: transaction.value
        }(transaction.data);

        if (!success) {
            revert CallFailed(result);
        }
        nonceUsed[transaction.nonce] = true;
        emit TransactionExecuted(
            transaction.nonce,
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.deadline,
            result
        );
        return result;
    }

    function createSplit(
        address token,
        address to,
        uint256 userAmount,
        SplitRecipient[] calldata splitRecipients
    ) external _onlyThisAddress returns (uint256) {
        uint256 _totalAmount = 0;
        for (uint256 i = 0; i < splitRecipients.length; i++) {
            _totalAmount += splitRecipients[i].amountToPay;
        }
        _totalAmount += userAmount;
        uint256 splitId = totalSplits++;
        Split storage split = splits[splitId];
        split.splitId = splitId;
        split.token = token;
        split.totalAmount = _totalAmount;
        // split.splitRecipients = splitRecipients;
        for (uint256 i = 0; i < splitRecipients.length; i++) {
            SmartAccount(splitRecipients[i].recipient).requestSplit(
                splitId,
                splitRecipients[i].amountToPay
            );
            split.splitRecipientsDetails.push(
                SplitRecipientDetails({
                    recipient: splitRecipients[i],
                    amountPaid: 0
                })
            );
        }
        IERC20(token).safeTransfer(to, _totalAmount);
        emit SplitCreated(splitId, token, to, _totalAmount, splitRecipients);
        return splitId;
    }

    function requestSplit(uint256 splitId, uint256 amount) external {
        SplitRequest memory splitRequest = SplitRequest({
            splitId: splitId,
            requester: msg.sender,
            amount: amount
        });
        splitRequests.push(splitRequest);
    }

    function notifyFullfillSplit(
        uint256 splitId,
        uint256 recepientIndex,
        uint256 amount
    ) external {
        Split storage split = splits[splitId];
        SplitRecipientDetails storage splitRecipientDetails = split
            .splitRecipientsDetails[recepientIndex];
        SplitRecipient storage splitRecipient = splitRecipientDetails.recipient;
        if (msg.sender != splitRecipient.recipient) {
            revert OnlyRecipient();
        }
        if (amount > splitRecipient.amountToPay) {
            revert SplitAmountGreaterThanPending(splitId);
        }
        if (splitRecipientDetails.amountPaid == splitRecipient.amountToPay) {
            revert SplitNotPending(splitId);
        }
        splitRecipientDetails.amountPaid += amount;
        IERC20(split.token).safeTransferFrom(
            splitRecipient.recipient,
            address(this),
            amount
        );
        emit SplitFullfilled(splitId, msg.sender, amount);
    }

    function fullfillSplit(
        uint256 splitRequestIndex,
        uint256 recepientIndex,
        uint256 amount
    ) external _onlyThisAddress {
        SplitRequest memory splitRequest = splitRequests[splitRequestIndex];
        SmartAccount(splitRequest.requester).notifyFullfillSplit(
            splitRequest.splitId,
            recepientIndex,
            amount
        );
    }

    function getAllSplitsCreated() external view returns (Split[] memory) {
        Split[] memory _splits = new Split[](totalSplits);
        for (uint256 i = 0; i < totalSplits; i++) {
            _splits[i] = splits[i];
        }
        return _splits;
    }

    function getSplit(uint256 splitId) external view returns (Split memory) {
        return splits[splitId];
    }

    function getSplitRequests() external view returns (SplitRequest[] memory) {
        return splitRequests;
    }

    function getSplitRequest(
        uint256 splitRequestIndex
    ) external view returns (SplitRequest memory) {
        return splitRequests[splitRequestIndex];
    }
}
