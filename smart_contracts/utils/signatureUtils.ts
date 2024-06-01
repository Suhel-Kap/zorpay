import { ethers } from "ethers";

type Transaction = {
  nonce: number;
  to: string;
  value: number;
  data: string;
  deadline: number;
};

const generateMsgData = (
  transaction: Transaction,
  chainId: number,
  verifyingContract: string
) => {
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

const generateSignature = async (
  nonce: number,
  to: string,
  value: number,
  data: string,
  deadline: number,
  chainId: number,
  verifyingContract: string,
  signer: ethers.providers.JsonRpcSigner | ethers.Wallet
  // rpcUrl: string
): Promise<string> => {
  const transaction: Transaction = {
    nonce,
    to,
    value,
    data,
    deadline,
  };
  const { domain, types, values } = generateMsgData(
    transaction,
    chainId,
    verifyingContract
  );
  // const wallet = new ethers.Wallet(ANVIL_PRIVATE_KEY);
  // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // const wallet = new ethers.Wallet(ANVIL_PRIVATE_KEY, provider);
  const signature = await signer._signTypedData(domain, types, values);
  return signature;
};

export { generateSignature };
