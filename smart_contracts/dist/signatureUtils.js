"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const generateMsgData = (transaction, chainId, verifyingContract) => {
    const domain = {
        name: "Zorpay",
        version: "1",
        chainId: chainId,
        verifyingContract: verifyingContract,
    };
    const types = {
        // EIP712Domain: [
        //   {
        //     name: "name",
        //     type: "string",
        //   },
        //   {
        //     name: "version",
        //     type: "string",
        //   },
        //   {
        //     name: "chainId",
        //     type: "uint256",
        //   },
        //   {
        //     name: "verifyingContract",
        //     type: "address",
        //   },
        // ],
        Transaction: [
            { name: "nonce", type: "uint256" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
            { name: "deadline", type: "uint256" },
        ],
    };
    const values = transaction;
    // const values = {
    //   nonce: transaction.nonce,
    //   to: transaction.to,
    //   value: transaction.value,
    //   data: transaction.data,
    //   deadline: transaction.deadline,
    // };
    return { domain, types, values };
};
const generateSignature = (nonce, to, value, data, deadline, chainId, verifyingContract, signer
// rpcUrl: string
) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = {
        nonce,
        to,
        value,
        data,
        deadline,
    };
    const { domain, types, values } = generateMsgData(transaction, chainId, verifyingContract);
    // const wallet = new ethers.Wallet(ANVIL_PRIVATE_KEY);
    // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // const wallet = new ethers.Wallet(ANVIL_PRIVATE_KEY, provider);
    const signature = yield signer._signTypedData(domain, types, values);
    return signature;
});
exports.generateSignature = generateSignature;
//# sourceMappingURL=signatureUtils.js.map