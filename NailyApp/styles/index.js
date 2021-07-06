import {StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';

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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
});

const searchStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    marginHorizontal: SIZES.margin10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchTextInput: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    color: COLORS.darkBlue,
    marginHorizontal: SIZES.margin10,
    flex: 1,
    fontSize: SIZES.body2,
    fontFamily: 'Roboto-Medium',
  },
  currentLocationButton: {
    width: 26,
    height: 26,
  },
  searchResultItemContainer: {
    paddingVertical: SIZES.smallPadding,
    paddingHorizontal: SIZES.padding,
  },
});

const reservationStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.margin5,
    backgroundColor: COLORS.white,
    ...styles.shadow,
    flex: 1,
  },
  workerImage: {
    width: 100,
    height: 100,
    marginEnd: SIZES.margin10,
    borderRadius: 50,
  },
  detailButtonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
});

export {styles, searchStyles, reservationStyles};
