import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useAppSelector} from '../../hooks/storeHooks';
import {getChainId, getSmartAccountAddress} from '../../stores/user.reducer';
import {ethers} from 'ethers';
import {getSplitRequests} from '../../utils/read.contract';

const SplitRequests = () => {
  const [splitRequests, setSplitRequests] = useState<
    Array<{
      requestId: string;
      amount: string;
      recipient: string;
    }>
  >([]);

  const smartAccountAddress = useAppSelector(getSmartAccountAddress);
  const chainId = useAppSelector(getChainId);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      getSplitRequests(smartAccountAddress, chainId).then(res => {
        res.forEach(request => {
          setSplitRequests(prevState => [
            ...prevState,
            {
              requestId: ethers.BigNumber.from(request[0]).toString(),
              amount: ethers.utils.formatEther(
                ethers.BigNumber.from(request[2]).toString(),
              ),
              recipient: request[1],
            },
          ]);
        });
      });
    }
  }, [smartAccountAddress, chainId]);

  const handlePay = (requestId: string) => {
    console.log(`Pay button pressed for request ${requestId}`);
    // Add logic to handle payment
  };

  return (
    <View style={styles.container}>
      {splitRequests.map(request => (
        <View style={styles.requestContainer} key={request.requestId}>
          <Text style={styles.requestText}>
            Request Id: {request.requestId}
          </Text>
          <Text style={styles.requestText}>Amount: ${request.amount}</Text>
          <Text style={styles.requestText}>Recipient: {request.recipient}</Text>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => handlePay(request.requestId)}>
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
