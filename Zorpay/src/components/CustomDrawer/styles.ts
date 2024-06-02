import {StyleSheet} from 'react-native';
import {COLORS} from '../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: COLORS.PRIMARY_TEXT,
  },
  drawerContent: {
    padding: 16,
  },
  drawerTitle: {
    fontSize: 18,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  drawerItem: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    paddingVertical: 8,
    fontWeight: 'semibold',
  },
  logoutButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
