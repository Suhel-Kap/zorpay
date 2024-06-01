import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../lib/constants';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: COLORS.PRIMARY,
    color: COLORS.PRIMARY_TEXT,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 20,
  },
  scanButton: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  amountSubText: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    marginTop: 10,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  key: {
    width: width / 4 - 20,
    height: width / 6,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
  keyText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  nextButton: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
  },
  qrModal: {
    height: height * 0.8,
  },
  addButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  addressList: {
    width: '100%',
    marginVertical: 20,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    height: 50,
    width: '100%',
  },
  addressText: {
    fontSize: 12,
    color: COLORS.PRIMARY_TEXT,
  },
  deleteText: {
    fontSize: 16,
    color: 'red',
  },
});
