import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../lib/constants';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  denyButton: {
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  processingText: {
    fontSize: 18,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 15,
  },
  confirmText: {
    fontSize: 18,
    color: COLORS.SUCCESS,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  hashText: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 5,
  },
  hashValue: {
    fontSize: 14,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 15,
  },
  homeButton: {
    padding: 15,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
});
