import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../lib/constants';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: height * 0.95,
    backgroundColor: 'white',
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    backgroundColor: COLORS.SECONDARY,
    height: height * 0.3,
    margin: 10,
    borderRadius: 10,
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  addressText: {
    fontSize: 20,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    marginRight: 10,
  },
  shareIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.SECONDARY_TEXT,
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
