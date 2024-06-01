import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../lib/constants';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    width,
    height,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  loginButton: {
    backgroundColor: COLORS.SECONDARY,
    width: width * 0.45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
});
