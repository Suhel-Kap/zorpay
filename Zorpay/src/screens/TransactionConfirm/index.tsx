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

const TransactionConfirm = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {to, data, value, message, isProcessing, transactionHash} =
    useAppSelector(getTransaction);

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

        // Simulate sending transaction
        setTimeout(() => {
          const hash = '0x1234567890abcdef'; // Example hash
          dispatch(setTransactionHash(hash));
          dispatch(setProcessing(false));
        }, 3000);
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
            <ActivityIndicator size="large" color="#0000ff" />
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
