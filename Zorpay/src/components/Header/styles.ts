import {StyleSheet} from 'react-native';
import {COLORS} from '../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 70,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  logoImage: {
    width: 30,
    height: 30,
  },
});
