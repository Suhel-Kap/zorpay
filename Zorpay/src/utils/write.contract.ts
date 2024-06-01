import {
  MyUSD,
  SmartAccount,
  SmartAccountFactory,
  MyUSD__factory,
  SmartAccountFactory__factory,
  SmartAccount__factory,
} from './types';
import CONTRACT_ADDRESSES from './contractAddresses/contract-address.json';
import {ethers} from 'ethers';
import {BACKEND_URL, NETWORKS} from '../lib/constants';
import {SupportedChainIds} from './read.contract';

const createSmartAccount = async (
  eoaAddress: string,
  chainId: SupportedChainIds,
) => {
  const txData =
    SmartAccountFactory__factory.createInterface().encodeFunctionData(
      'createSmartAccount',
      [eoaAddress],
    );

  const res = await fetch(`${BACKEND_URL}/ExecuteAny`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rpcURL: NETWORKS[chainId].rpcUrl,
      transactionData: txData,
      to: CONTRACT_ADDRESSES[chainId].SmartAccountFactory,
    }),
  });

  const {txReceipt, txResponse} = (await res.json()) as {
    txResponse: ethers.providers.TransactionResponse;
    txReceipt: ethers.providers.TransactionReceipt;
  };

  return txReceipt;
};

const executeTransaction = async (
  transaction: SmartAccount.TransactionStruct,
  signature: string,
  chainId: SupportedChainIds,
  userSmartAccountAddress: string,
) => {
  const txData = SmartAccount__factory.createInterface().encodeFunctionData(
    'execute',
    [transaction, signature],
  );

  try {
    const res = await fetch(`${BACKEND_URL}/ExecuteAny`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rpcURL: NETWORKS[chainId].rpcUrl,
        transactionData: txData,
        to: userSmartAccountAddress,
      }),
    });

    const {txReceipt, txResponse} = (await res.json()) as {
      txResponse: ethers.providers.TransactionResponse;
      txReceipt: ethers.providers.TransactionReceipt;
    };
    return {success: true, txReceipt};
  } catch (error) {
    return {success: false, txReceipt: undefined};
  }
};

export {createSmartAccount, executeTransaction};
