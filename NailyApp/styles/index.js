import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    paddingHorizontal: 24,
  },
  body: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 15,
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});

export default styles;
