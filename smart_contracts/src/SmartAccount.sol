// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SmartAccount is EIP712 {
    error InvalidSignature();
    error CallFailed(bytes revertData);
    error DeadlineExpired(uint256 deadline);
    error NonceUsed(uint256 nonce);

    event TransactionExecuted(
        uint256 nonce,
        address to,
        uint256 value,
        bytes data,
        uint256 deadline,
        bytes result
    );

    struct Transaction {
        uint256 nonce;
        address to;
        uint256 value;
        bytes data;
        uint256 deadline;
    }

    address public immutable owner;
    mapping(uint256 => bool) public nonceUsed;

    constructor(address _owner) EIP712("Zorpay", "1") {
        owner = _owner;
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
}
