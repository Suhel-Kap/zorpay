import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  getTransaction,
  setProcessing,
  setTransactionHash,
  setTransactionDetails,
  resetTransaction,
} from '../../stores/transaction.reducer';
import {generateRandomNonce, generateSignature} from '../../utils/utils';
import {getChainId, getSmartAccountAddress} from '../../stores/user.reducer';
import {SupportedChainIds} from '../../utils/read.contract';
import {COLORS, NETWORKS, magic} from '../../lib/constants';
import {ethers} from 'ethers';
import {executeTransaction} from '../../utils/write.contract';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONTRACT_ADDRESSES from '../../utils/contractAddresses/contract-address.json';
import {MyUSD__factory} from '../../utils/types';

const TransactionConfirm = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {to, data, value, message, isProcessing, transactionHash, extraData} =
    useAppSelector(getTransaction);

  const smartAccountAddress = useAppSelector(getSmartAccountAddress);
  const chainId = useAppSelector(getChainId) as SupportedChainIds;

  const handleConfirm = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const res = await rnBiometrics.isSensorAvailable();
      console.log('Biometric sensor available:', res);
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to store your private key',
      });
      if (success) {
        dispatch(setProcessing(true));

        const signer = new ethers.providers.Web3Provider(
          // @ts-ignore
          magic?.rpcProvider,
        ).getSigner();

        if (extraData.approve) {
          const {signature, transaction} = await generateSignature(
            generateRandomNonce(),
            CONTRACT_ADDRESSES[chainId].MyUSD,
            0,
            MyUSD__factory.createInterface().encodeFunctionData('approve', [
              extraData.requester,
              ethers.utils.parseEther(extraData.amount),
            ]),
            Date.now() + 1000 * 60 * 5, // 5 minutes
            chainId,
            smartAccountAddress,
            signer,
          );
          console.log('executing transaction', transaction, signature);
          const {success, txReceipt} = await executeTransaction(
            transaction,
            signature,
            chainId,
            smartAccountAddress,
          );
          if (!success) {
            // handle failure here
            console.log('Transaction failed');
            return;
          }
        }

        const {signature, transaction} = await generateSignature(
          generateRandomNonce(),
          to,
          0,
          data,
          Date.now() + 1000 * 60 * 5, // 5 minutes
          chainId,
          smartAccountAddress,
          signer,
        );
        console.log('executing transaction', transaction, signature);
        const {success, txReceipt} = await executeTransaction(
          transaction,
          signature,
          chainId,
          smartAccountAddress,
        );
        if (success) {
          const txHist = await AsyncStorage.getItem('transactionHistory');
          await AsyncStorage.setItem(
            'transactionHistory',
            JSON.stringify([
              ...(txHist ? JSON.parse(txHist) : []),
              {
                type: extraData.type,
                amount: extraData.amount,
                transactionHash: txReceipt!.transactionHash,
                time: Date.now(),
              },
            ]),
          );
          dispatch(setTransactionHash(txReceipt!.transactionHash));
          dispatch(setProcessing(false));
        } else {
          // handle failure here
          console.log('Transaction failed');
        }
      }
    } catch (error) {
      console.log('Authentication Failed', error);
    }
  };

  const handleGoHome = () => {
    dispatch(resetTransaction());
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {isProcessing ? (
          <>
            <Text style={styles.processingText}>Transaction Processing...</Text>
            <ActivityIndicator size="large" color={COLORS.PRIMARY_TEXT} />
          </>
        ) : transactionHash ? (
          <>
            <Text style={styles.confirmText}>Transaction Confirmed!</Text>
            <Text style={styles.hashText}>Transaction Hash:</Text>
            <Text style={styles.hashValue}>{transactionHash}</Text>
            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>To:</Text>
            <Text style={styles.value}>{to}</Text>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{data}</Text>
            <Text style={styles.label}>Value:</Text>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.value}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.denyButton}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default TransactionConfirm;
