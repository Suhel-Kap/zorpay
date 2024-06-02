import {StyleSheet} from 'react-native';
import {COLORS} from '../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  requestContainer: {
    backgroundColor: COLORS.SECONDARY,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  requestText: {
    color: COLORS.PRIMARY_TEXT,
    fontSize: 16,
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noRequestsText: {
    color: COLORS.SECONDARY_TEXT,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
