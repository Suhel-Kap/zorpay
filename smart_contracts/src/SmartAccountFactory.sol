// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {SmartAccount} from "../src/SmartAccount.sol";

contract SmartAccountFactory {
    error SmartAccountAlreadyExists(address owner);

    event SmartAccountCreated(address owner, address smartAccount);

    mapping(address owner => address smartAccount) public smartAccounts;

    function createSmartAccount(address owner) public returns (SmartAccount) {
        if (smartAccounts[owner] != address(0)) {
            revert SmartAccountAlreadyExists(owner);
        }
        SmartAccount smartAccount = new SmartAccount(owner);
        smartAccounts[owner] = address(smartAccount);
        emit SmartAccountCreated(owner, address(smartAccount));
        return smartAccount;
    }
}
