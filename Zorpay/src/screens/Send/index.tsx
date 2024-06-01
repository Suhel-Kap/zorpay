import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Modal} from 'react-native';
import {styles} from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS} from '../../lib/constants';
import {isAddress} from 'viem';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {ToastAndroid} from 'react-native';
import {
  resetTransaction,
  setTransactionDetails,
} from '../../stores/transaction.reducer';
import CONTRACT_ADDRESSES from '../../utils/contractAddresses/contract-address.json';
import {getChainId, getUsdcBalance} from '../../stores/user.reducer';
import {SupportedChainIds} from '../../utils/read.contract';
import {MyUSD__factory} from '../../utils/types';
import {ethers} from 'ethers';

const Send = ({navigation}) => {
  const [screen, setScreen] = useState('walletAddress');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const dispatch = useAppDispatch();
  const chainId = useAppSelector(getChainId) as SupportedChainIds;
  const usdcBalance = useAppSelector(getUsdcBalance);

  const handleNext = () => {
    if (screen === 'walletAddress' && address) {
      if (!isAddress(address)) {
        ToastAndroid.show('Invalid address', ToastAndroid.SHORT);
        return;
      }
      setScreen('amount');
    } else if (screen === 'amount' && amount) {
      // Handle the final submission
      console.log('Send to:', address);
      console.log('Amount:', amount);
      dispatch(resetTransaction());
      dispatch(
        setTransactionDetails({
          to: CONTRACT_ADDRESSES[chainId].MyUSD,
          value: '0',
          data: MyUSD__factory.createInterface().encodeFunctionData(
            'transfer',
            [address, ethers.utils.parseUnits(amount, 18)],
          ),
          message: `Send ${amount} USD to ${address}`,
          extraData: {
            type: 'Transfer',
            amount: amount,
          },
        }),
      );
      navigation.navigate('TransactionConfirm');
    }
  };

  const handlePress = value => {
    setAmount(amount + value);
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const onSuccess = e => {
    setAddress(e.data.slice(-42));
    setIsScannerOpen(false);
  };

  return (
    <View style={styles.container}>
      {screen === 'walletAddress' ? (
        <View style={styles.mainContainer}>
          <Text style={styles.label}>Enter Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Wallet Address"
            value={address}
            placeholderTextColor={COLORS.SECONDARY_TEXT}
            onChangeText={setAddress}
          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setIsScannerOpen(true)}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          <Modal
            visible={isScannerOpen}
            animationType="slide"
            style={styles.qrModal}>
            <QRCodeScanner
              onRead={onSuccess}
              vibrate
              reactivate
              reactivateTimeout={1000}
              showMarker
              topContent={
                <Text style={styles.centerText}>Scan the QR code</Text>
              }
              bottomContent={
                <Text style={{color: 'white', marginBottom: 100, zIndex: 1000}}>
                  Scan the QR code to get the wallet address
                </Text>
              }
            />
          </Modal>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Text style={styles.label}>Sending to:</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.amountText}>${amount || '0.00'}</Text>
          <Text style={styles.amountSubText}>${usdcBalance} available</Text>
          <View style={styles.keyboardContainer}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(
              key => (
                <TouchableOpacity
                  key={key}
                  style={styles.key}
                  onPress={() => handlePress(key)}>
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity style={styles.key} onPress={handleBackspace}>
              <Text style={styles.keyText}>⌫</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Send;
