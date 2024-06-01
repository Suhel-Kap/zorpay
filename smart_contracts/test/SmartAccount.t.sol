// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {SmartAccount} from "../src/SmartAccount.sol";
import {SmartAccountFactory} from "../src/SmartAccountFactory.sol";
import {MyUSD} from "../src/MyUSD.sol";
import {DeployFactory} from "../script/DeployFactory.s.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccountTest is Test {
    SmartAccountFactory public smartAccountFactory;
    uint256 ANVIL_PRIVATE_KEY_1 =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 ANVIL_PRIVATE_KEY_2 =
        0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    uint256 ANVIL_PRIVATE_KEY_3 =
        0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;
    uint256 ANVIL_PRIVATE_KEY_4 =
        0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6;

    function setUp() public {
        smartAccountFactory = (new DeployFactory()).run();
    }

    function generateSignature(
        SmartAccount.Transaction memory transaction,
        SmartAccount verifyingContract,
        uint256 private_key
    ) public returns (bytes memory) {
        // yarn --silent generateSignature 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0 0x 365 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        string[] memory inputs = new string[](11);
        inputs[0] = "yarn";
        inputs[1] = "--silent";
        inputs[2] = "generateSignature";
        inputs[3] = vm.toString(transaction.nonce);
        inputs[4] = vm.toString(transaction.to);
        inputs[5] = vm.toString(transaction.value);
        inputs[6] = vm.toString(transaction.data);
        inputs[7] = vm.toString(transaction.deadline);
        inputs[8] = vm.toString(block.chainid);
        inputs[9] = vm.toString(address(verifyingContract));
        inputs[10] = vm.toString(bytes32(private_key));
        bytes memory res = vm.ffi(inputs);
        return res;
    }

    function test_Execute() public {
        uint256 private_key = ANVIL_PRIVATE_KEY_1;
        address user = vm.addr(private_key);
        SmartAccount smartAccount = smartAccountFactory.createSmartAccount(
            user
        );
        Counter counter = new Counter();
        bytes memory data = abi.encodeWithSelector(Counter.increment.selector);
        SmartAccount.Transaction memory transaction = SmartAccount.Transaction({
            nonce: 0,
            to: address(counter),
            value: 0,
            data: data,
            deadline: block.timestamp + 1
        });

        bytes memory res = generateSignature(
            transaction,
            smartAccount,
            private_key
        );
        smartAccount.execute(transaction, res);
        assertEq(counter.number(), 1);
    }

    function test_Split() public {
        MyUSD token = new MyUSD();

        uint256 private_key_1 = ANVIL_PRIVATE_KEY_1;
        uint256 private_key_2 = ANVIL_PRIVATE_KEY_2;
        uint256 private_key_3 = ANVIL_PRIVATE_KEY_3;
        uint256 private_key_4 = ANVIL_PRIVATE_KEY_4;
        address user1 = vm.addr(private_key_1);
        address user2 = vm.addr(private_key_2);
        address user3 = vm.addr(private_key_3);
        address user4 = vm.addr(private_key_4);

        address to = address(0x123);

        SmartAccount smartAccount1 = smartAccountFactory.createSmartAccount(
            user1
        );
        SmartAccount smartAccount2 = smartAccountFactory.createSmartAccount(
            user2
        );
        SmartAccount smartAccount3 = smartAccountFactory.createSmartAccount(
            user3
        );
        SmartAccount smartAccount4 = smartAccountFactory.createSmartAccount(
            user4
        );

        token.mint(address(smartAccount1), 400);
        token.mint(address(smartAccount2), 100);
        token.mint(address(smartAccount3), 100);
        token.mint(address(smartAccount4), 100);

        SmartAccount.SplitRecipient[]
            memory splitRecipients = new SmartAccount.SplitRecipient[](3);
        splitRecipients[0] = SmartAccount.SplitRecipient({
            recipient: address(smartAccount2),
            amountToPay: 100
        });
        splitRecipients[1] = SmartAccount.SplitRecipient({
            recipient: address(smartAccount3),
            amountToPay: 100
        });
        splitRecipients[2] = SmartAccount.SplitRecipient({
            recipient: address(smartAccount4),
            amountToPay: 100
        });

        SmartAccount.Transaction memory createSplitTransaction = SmartAccount
            .Transaction({
                nonce: 0,
                to: address(smartAccount1),
                value: 0,
                data: abi.encodeWithSelector(
                    SmartAccount.createSplit.selector,
                    address(token),
                    to,
                    100,
                    splitRecipients
                ),
                deadline: block.timestamp + 1
            });
        bytes memory res = generateSignature(
            createSplitTransaction,
            smartAccount1,
            private_key_1
        );
        smartAccount1.execute(createSplitTransaction, res);
        assertEq(token.balanceOf(address(smartAccount1)), 0);
        assertEq(token.balanceOf(to), 400);

        SmartAccount.Transaction memory allowFrom2To1Transaction = SmartAccount
            .Transaction({
                nonce: 1,
                to: address(token),
                value: 0,
                data: abi.encodeWithSelector(
                    ERC20.approve.selector,
                    address(smartAccount1),
                    100
                ),
                deadline: block.timestamp + 1
            });
        res = generateSignature(
            allowFrom2To1Transaction,
            smartAccount2,
            private_key_2
        );
        smartAccount2.execute(allowFrom2To1Transaction, res);

        assertEq(
            token.allowance(address(smartAccount2), address(smartAccount1)),
            100
        );

        SmartAccount.Transaction
            memory fullFillSplitBy2Transaction = SmartAccount.Transaction({
                nonce: 2,
                to: address(smartAccount2),
                value: 0,
                data: abi.encodeWithSelector(
                    SmartAccount.fullfillSplit.selector,
                    0,
                    0,
                    100
                ),
                deadline: block.timestamp + 1
            });
        res = generateSignature(
            fullFillSplitBy2Transaction,
            smartAccount2,
            private_key_2
        );
        smartAccount2.execute(fullFillSplitBy2Transaction, res);
        assertEq(token.balanceOf(address(smartAccount2)), 0);
        assertEq(token.balanceOf(address(smartAccount1)), 100);
        assertEq(
            smartAccount1.getSplit(0).splitRecipientsDetails[0].amountPaid,
            100
        );
    }
}

contract Counter {
    uint256 public number;

    function increment() public {
        number++;
    }
}
