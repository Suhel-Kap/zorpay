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
import {NETWORKS} from '../lib/constants';

export type SupportedChainIds = keyof typeof CONTRACT_ADDRESSES;

const getSmartAccountAddress = async (
  eoa: string,
  chainId: SupportedChainIds,
) => {
  const smartAccountFactory = SmartAccountFactory__factory.connect(
    CONTRACT_ADDRESSES[chainId].SmartAccountFactory,
    new ethers.providers.JsonRpcProvider(NETWORKS[chainId].rpcUrl),
  );
  const smartAccountAddress = await smartAccountFactory.smartAccounts(eoa);
  return smartAccountAddress;
};

const checkIfAccountExists = async (
  eoa: string,
  chainId: SupportedChainIds,
) => {
  const smartAccountAddress = await getSmartAccountAddress(eoa, chainId);
  return smartAccountAddress !== ethers.constants.AddressZero;
};

const getSplitRequests = async (eoa: string, chainId: SupportedChainIds) => {
  const smartAccountFactory = SmartAccount__factory.connect(
    eoa,
    new ethers.providers.JsonRpcProvider(NETWORKS[chainId].rpcUrl),
  );
  const splitRequests = await smartAccountFactory.getSplitRequests();
  return splitRequests;
};

const getSplitByID = async (
  smartAccountAddress: string,
  splitID: number,
  chainId: SupportedChainIds,
) => {
  const smartAccountFactory = SmartAccount__factory.connect(
    smartAccountAddress,
    new ethers.providers.JsonRpcProvider(NETWORKS[chainId].rpcUrl),
  );
  const split = await smartAccountFactory.getSplit(splitID);
  return split;
};

export {
  checkIfAccountExists,
  getSmartAccountAddress,
  getSplitRequests,
  getSplitByID,
};
