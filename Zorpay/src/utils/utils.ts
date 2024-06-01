import {ethers, BigNumberish} from 'ethers';
import {
  MyUSD,
  SmartAccount,
  SmartAccountFactory,
  MyUSD__factory,
  SmartAccountFactory__factory,
  SmartAccount__factory,
} from './types';

const generateRandomNonce = () => {
  const randomArray = crypto.getRandomValues(new Uint8Array(32));
  const randomNonce = ethers.utils.hexlify(randomArray);
  return randomNonce;
};

const generateMsgData = (
  transaction: SmartAccount.TransactionStruct,
  chainId: number | string,
  verifyingContract: string,
) => {
  const domain = {
    name: 'Zorpay',
    version: '1',
    chainId: chainId,
    verifyingContract: verifyingContract,
  };
  const types = {
    Transaction: [
      {name: 'nonce', type: 'uint256'},
      {name: 'to', type: 'address'},
      {name: 'value', type: 'uint256'},
      {name: 'data', type: 'bytes'},
      {name: 'deadline', type: 'uint256'},
    ],
  };
  const values = transaction;
  return {domain, types, values};
};

const generateSignature = async (
  nonce: number | string,
  to: string,
  value: number,
  data: string,
  deadline: number,
  chainId: number | string,
  verifyingContract: string,
  signer: ethers.providers.JsonRpcSigner | ethers.Wallet,
) => {
  const transaction: SmartAccount.TransactionStruct = {
    nonce,
    to,
    value,
    data,
    deadline,
  };
  const {domain, types, values} = generateMsgData(
    transaction,
    chainId,
    verifyingContract,
  );
  const signature = await signer._signTypedData(domain, types, values);
  return {signature, transaction};
};

async function generateTransferTokenSignature(
  from: string, // smart account address of user
  tokenAddress: string,
  toAddress: string,
  amount: BigNumberish,
  signer: ethers.providers.JsonRpcSigner | ethers.Wallet,
  chainId: number,
  deadline: number,
) {
  return generateSignature(
    generateRandomNonce(),
    tokenAddress,
    0,
    MyUSD__factory.createInterface().encodeFunctionData('transfer', [
      toAddress,
      amount,
    ]),
    deadline,
    chainId,
    from,
    signer,
  );
}

async function generateCreateSplitSignature(
  from: string, // smart account address of user
  toAddress: string,
  tokenAddress: string,
  userAmount: number,
  recipients: SmartAccount.SplitRecipientStruct[],
  signer: ethers.providers.JsonRpcSigner | ethers.Wallet,
  chainId: number,
  deadline: number,
) {
  return generateSignature(
    generateRandomNonce(),
    tokenAddress,
    0,
    SmartAccount__factory.createInterface().encodeFunctionData('createSplit', [
      tokenAddress,
      toAddress,
      userAmount,
      recipients,
    ]),
    deadline,
    chainId,
    from,
    signer,
  );
}

export {
  generateRandomNonce,
  generateMsgData,
  generateSignature,
  generateTransferTokenSignature,
  generateCreateSplitSignature,
};
