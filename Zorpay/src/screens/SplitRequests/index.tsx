import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getChainId, getSmartAccountAddress} from '../../stores/user.reducer';
import {ethers} from 'ethers';
import {
  SupportedChainIds,
  getSplitByID,
  getSplitRequests,
} from '../../utils/read.contract';
import {setTransactionDetails} from '../../stores/transaction.reducer';
import CONTRACT_ADDRESSES from '../../utils/contractAddresses/contract-address.json';
import {SmartAccount__factory} from '../../utils/types';

const SplitRequests = ({navigation}) => {
  const [splitRequests, setSplitRequests] = useState<
    Array<{
      requestId: string;
      amount: string;
      requester: string;
    }>
  >([]);

  const smartAccountAddress = useAppSelector(getSmartAccountAddress);
  const chainId = useAppSelector(getChainId) as SupportedChainIds;
  const dispatch = useAppDispatch();
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      getSplitRequests(smartAccountAddress, chainId).then(res => {
        res.forEach(request => {
          setSplitRequests(prevState => [
            ...prevState,
            {
              requestId: ethers.BigNumber.from(request.splitId).toString(),
              amount: ethers.utils.formatEther(
                ethers.BigNumber.from(request.amount).toString(),
              ),
              requester: request.requester,
            },
          ]);
        });
      });
    }
  }, [smartAccountAddress, chainId]);

  const handlePay = async (requestId: string, splitRequestIndex: number) => {
    console.log(`Pay button pressed for request ${requestId}`);
    const splitRequest = splitRequests.find(
      request => request.requestId === requestId,
    );
    const split = await getSplitByID(
      smartAccountAddress,
      parseInt(requestId),
      chainId,
    );
    let recipientIndex = split.splitRecipientsDetails.findIndex(
      request => request.recipient.recipient === smartAccountAddress,
    );
    dispatch(
      setTransactionDetails({
        to: smartAccountAddress,
        value: '0',
        data: SmartAccount__factory.createInterface().encodeFunctionData(
          'fullfillSplit',
          [
            recipientIndex,
            splitRequestIndex,
            ethers.utils.parseEther(splitRequest?.amount!),
          ],
        ),
        message: `Fullfilling split request by ${splitRequest?.requester} for ${splitRequest?.amount} USD`,
        extraData: {
          type: 'Split Payment Fullfilled',
          amount: splitRequest?.amount!,
          approve: true,
          requester: splitRequest?.requester,
        },
      }),
    );
    navigation.navigate('TransactionConfirm');
  };

  return (
    <View style={styles.container}>
      {splitRequests.map((request, index) => (
        <View style={styles.requestContainer} key={request.requestId}>
          <Text style={styles.requestText}>
            Request Id: {request.requestId}
          </Text>
          <Text style={styles.requestText}>Amount: ${request.amount}</Text>
          <Text style={styles.requestText}>Requester: {request.requester}</Text>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => handlePay(request.requestId, index)}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      ))}
      {splitRequests.length === 0 && (
        <Text style={styles.noRequestsText}>No split requests found</Text>
      )}
    </View>
  );
};

export default SplitRequests;
