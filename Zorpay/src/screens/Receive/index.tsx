import React, {useEffect, useState} from 'react';
import {Text, View, Share, ToastAndroid} from 'react-native';
import {SvgXml} from 'react-native-svg';
import qrcode from '../../lib/qrcode';
import {useAccount} from 'wagmi';
import {useAppSelector} from '../../hooks/storeHooks';
import {getIsMagic} from '../../stores/user.reducer';
import {COLORS, magic} from '../../lib/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native';

const Receive = () => {
  const [qrSvg, setQrSvg] = useState('');
  const [address, setAddress] = useState('');

  const {address: eoaAddress} = useAccount();
  const isMagic = useAppSelector(getIsMagic);

  const determineUserAddress = async () => {
    let _address = '';
    if (isMagic) {
      _address = (await magic.user.getInfo()).publicAddress as string;
    } else {
      _address = eoaAddress as string;
    }
    setAddress(_address);
    const qr = qrcode(0, 'L');
    qr.addData(_address as string);
    qr.make();
    setQrSvg(qr.createSvgTag({scalable: true}));
  };

  useEffect(() => {
    determineUserAddress();
  }, []);

  const handleCopy = () => {
    Clipboard.setString(address);
    ToastAndroid.show('Address copied to clipboard', ToastAndroid.SHORT);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Address: ${address}\n\nSend only on BSC Testnet.`,
      });
    } catch (error: any) {
      ToastAndroid.show('Error sharing address', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qrContainer}>
        {qrSvg && <SvgXml xml={qrSvg} width={200} height={200} />}
      </View>
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={handleCopy}>
          <Text style={styles.addressText}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.shareIconContainer}>
          <Feather name="share" size={20} color={COLORS.PRIMARY_TEXT} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Receive;
