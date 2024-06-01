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

export {checkIfAccountExists, getSmartAccountAddress};