/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface SmartAccountFactoryInterface extends utils.Interface {
  functions: {
    "createSmartAccount(address)": FunctionFragment;
    "smartAccounts(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "createSmartAccount" | "smartAccounts"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createSmartAccount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "smartAccounts",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createSmartAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "smartAccounts",
    data: BytesLike
  ): Result;

  events: {
    "SmartAccountCreated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SmartAccountCreated"): EventFragment;
}

export interface SmartAccountCreatedEventObject {
  owner: string;
  smartAccount: string;
}
export type SmartAccountCreatedEvent = TypedEvent<
  [string, string],
  SmartAccountCreatedEventObject
>;

export type SmartAccountCreatedEventFilter =
  TypedEventFilter<SmartAccountCreatedEvent>;

export interface SmartAccountFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SmartAccountFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createSmartAccount(
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    smartAccounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[string] & { smartAccount: string }>;
  };

  createSmartAccount(
    owner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  smartAccounts(owner: string, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createSmartAccount(
      owner: string,
      overrides?: CallOverrides
    ): Promise<string>;

    smartAccounts(owner: string, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SmartAccountCreated(address,address)"(
      owner?: null,
      smartAccount?: null
    ): SmartAccountCreatedEventFilter;
    SmartAccountCreated(
      owner?: null,
      smartAccount?: null
    ): SmartAccountCreatedEventFilter;
  };

  estimateGas: {
    createSmartAccount(
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    smartAccounts(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createSmartAccount(
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    smartAccounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
