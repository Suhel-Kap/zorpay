import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../lib/constants';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: height * 0.1,
  },
  yourBalanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.SECONDARY_TEXT,
  },
  balance: {
    fontSize: 60,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  itemContainer: {
    padding: 14,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 50,
    marginHorizontal: 13,
  },
  itemText: {
    color: COLORS.SECONDARY_TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  floatingDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: COLORS.SECONDARY,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  drawerHandle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.SECONDARY_TEXT,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.PRIMARY_TEXT,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY_TEXT,
  },
  transactionItemTitle: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  transactionItemAmount: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  transactionItemDate: {
    color: COLORS.SECONDARY_TEXT,
    fontWeight: 'bold',
  },
  transactionItemLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionItemIcon: {
    width: 30,
    height: 30,
  },
});
