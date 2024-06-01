// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {SmartAccount} from "../src/SmartAccount.sol";
import {SmartAccountFactory} from "../src/SmartAccountFactory.sol";
import {DeployFactory} from "../script/DeployFactory.s.sol";

contract AccountTest is Test {
    SmartAccountFactory public smartAccountFactory;
    uint256 ANVIL_PRIVATE_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address user = vm.addr(ANVIL_PRIVATE_KEY);

    function setUp() public {
        smartAccountFactory = (new DeployFactory()).run();
    }

    function test_Execute() public {
        // smartAccount = new SmartAccount(user);
        SmartAccount smartAccount = smartAccountFactory.createSmartAccount(
            user
        );
        Counter counter = new Counter();
        bytes memory data = abi.encodeWithSignature("increment()");
        SmartAccount.Transaction memory transaction = SmartAccount.Transaction({
            nonce: 0,
            to: address(counter),
            value: 0,
            data: data,
            deadline: block.timestamp + 1
        });

        // yarn --silent generateSignature 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0 0x 365 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        string[] memory inputs = new string[](10);
        inputs[0] = "yarn";
        inputs[1] = "--silent";
        inputs[2] = "generateSignature";
        inputs[3] = vm.toString(transaction.nonce);
        inputs[4] = vm.toString(transaction.to);
        inputs[5] = vm.toString(transaction.value);
        inputs[6] = vm.toString(transaction.data);
        inputs[7] = vm.toString(transaction.deadline);
        inputs[8] = vm.toString(block.chainid);
        inputs[9] = vm.toString(address(smartAccount));
        bytes memory res = vm.ffi(inputs);
        smartAccount.execute(transaction, res);
        assertEq(counter.number(), 1);
    }
}

contract Counter {
    uint256 public number;

    function increment() public {
        number++;
    }
}
