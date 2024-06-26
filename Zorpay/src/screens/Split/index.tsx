import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ToastAndroid} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {styles} from './styles';
import {COLORS, NETWORKS, magic} from '../../lib/constants';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  resetTransaction,
  setTransactionDetails,
} from '../../stores/transaction.reducer';
import {isAddress} from 'viem';
import {
  getChainId,
  getSmartAccountAddress,
  getUsdcBalance,
} from '../../stores/user.reducer';
import {SmartAccount, SmartAccount__factory} from '../../utils/types';
import {SupportedChainIds} from '../../utils/read.contract';
import CONTRACT_ADDRESSES from '../../utils/contractAddresses/contract-address.json';
import {ethers} from 'ethers';

const Split = ({navigation}) => {
  const [screen, setScreen] = useState('receiver');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const smartAccountAddress = useAppSelector(getSmartAccountAddress);
  const chainId = useAppSelector(getChainId) as SupportedChainIds;
  const usdcBalance = useAppSelector(getUsdcBalance);

  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (screen === 'receiver' && receiverAddress) {
      if (!isAddress(receiverAddress)) {
        ToastAndroid.show('Invalid receiver address', ToastAndroid.SHORT);
        return;
      }
      setScreen('amount');
    } else if (screen === 'amount' && amount) {
      setScreen('contributors');
    } else if (
      screen === 'contributors' &&
      addresses.length > 0 &&
      smartAccountAddress
    ) {
      const userAmount = ethers.utils.parseEther(
        (parseFloat(amount) / (addresses.length + 1)).toString(),
      );
      const recipientsData: SmartAccount.SplitRecipientStruct[] = addresses.map(
        (address: string) => ({
          recipient: address,
          amountToPay: userAmount,
        }),
      );
      dispatch(resetTransaction());
      dispatch(
        setTransactionDetails({
          to: smartAccountAddress,
          value: 0,
          data: SmartAccount__factory.createInterface().encodeFunctionData(
            'createSplit',
            [
              CONTRACT_ADDRESSES[chainId].MyUSD,
              receiverAddress,
              userAmount,
              recipientsData,
            ],
          ),
          message: `Split ${amount} USD to ${
            addresses.length + 1
          } people including you for payment to ${receiverAddress}`,
          extraData: {
            type: 'Split',
            amount: amount,
          },
        }),
      );
      navigation.navigate('TransactionConfirm');
    }
  };

  const handleAddAddress = () => {
    if (!currentAddress) return;
    if (!isAddress(currentAddress)) {
      ToastAndroid.show('Invalid address', ToastAndroid.SHORT);
      return;
    }
    setAddresses([...addresses, currentAddress]);
    setCurrentAddress('');
  };

  const handleDeleteAddress = index => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const onSuccess = e => {
    setReceiverAddress(e.data.slice(-42));
    setIsScannerOpen(false);
  };

  const onScanContributor = e => {
    setAddresses([...addresses, e.data.slice(-42)]);
    setIsScannerOpen(false);
  };

  const handlePress = value => {
    setAmount(amount + value);
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const renderAddress = ({item, index}) => (
    <View style={styles.addressItem}>
      <Text style={styles.addressText}>{item}</Text>
      <Text style={styles.addressText}>
        ${(parseFloat(amount) / (addresses.length + 1)).toFixed(1)}
      </Text>
      <TouchableOpacity onPress={() => handleDeleteAddress(index)}>
        <Octicons name="trash" size={18} color={COLORS.PRIMARY} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {screen === 'receiver' ? (
        <View style={styles.mainContainer}>
          <Text style={styles.label}>Enter Receiver's Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Receiver's Wallet Address"
            value={receiverAddress}
            placeholderTextColor={COLORS.SECONDARY_TEXT}
            onChangeText={setReceiverAddress}
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
      ) : screen === 'amount' ? (
        <View style={styles.mainContainer}>
          <Text style={styles.label}>Sending to:</Text>
          <Text style={styles.address}>{receiverAddress}</Text>
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
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Text style={styles.label}>Enter Contributors' Addresses</Text>
          <TextInput
            style={styles.input}
            placeholder="Contributor's Wallet Address"
            value={currentAddress}
            placeholderTextColor={COLORS.SECONDARY_TEXT}
            onChangeText={setCurrentAddress}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.addButtonText}>Add Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setIsScannerOpen(true)}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
          <View style={styles.addressItem}>
            <Text style={styles.addressText}>{smartAccountAddress}</Text>
            <Text style={styles.addressText}>
              ${(parseFloat(amount) / (addresses.length + 1)).toFixed(1)}
            </Text>
          </View>
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={(item, index) => index.toString()}
            style={styles.addressList}
          />
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Send</Text>
          </TouchableOpacity>
          <Modal
            visible={isScannerOpen}
            animationType="slide"
            style={styles.qrModal}>
            <QRCodeScanner
              onRead={onScanContributor}
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
      )}
    </View>
  );
};

export default Split;
