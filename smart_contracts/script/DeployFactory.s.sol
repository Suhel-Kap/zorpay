// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SmartAccountFactory} from "../src/SmartAccountFactory.sol";

contract DeployFactory is Script {
    uint256 public constant ANVIL_PRIVATE_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    function run() public returns (SmartAccountFactory) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        if (block.chainid == 31337) {
            // Anvil
            deployerPrivateKey = ANVIL_PRIVATE_KEY;
        }
        vm.startBroadcast(deployerPrivateKey);
        SmartAccountFactory factory = new SmartAccountFactory();
        vm.stopBroadcast();
        return factory;
    }
}
