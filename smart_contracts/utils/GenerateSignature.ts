import { ethers } from "ethers";
import { generateSignature } from "./signatureUtils";

// takes args passed from console
const args = process.argv.slice(2);
const nonce = parseInt(args[0]);
const to = args[1];
const value = parseInt(args[2]);
const data = args[3];
const deadline = parseInt(args[4]);
const chainId = parseInt(args[5]);
const verifyingContract = args[6];
const privateKey = args[7];
// const rpcUrl = args[8];

// console.log("args", {
//   nonce,
//   to,
//   value,
//   data,
//   deadline,
//   chainId,
//   verifyingContract,
//   // rpcUrl
// });

// you can run the script by running the following command
// yarn --silent generateSignature 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0 0x 365 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// NOTE: --silent is added so that it doesn't print the "Done in X.YZs." message after running the script

// const ANVIL_PRIVATE_KEY =
//   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new ethers.Wallet(privateKey);

const result = generateSignature(
  nonce,
  to,
  value,
  data,
  deadline,
  chainId,
  verifyingContract,
  wallet
  // rpcUrl
);
result.then((signature) => {
  console.log(signature);
});
