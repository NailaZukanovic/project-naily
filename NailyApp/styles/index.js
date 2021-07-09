import {StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: SIZES.padding,
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
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  lightShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  fullContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    paddingBottom: 100,
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

const reservationStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.margin5,
    backgroundColor: COLORS.white,
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

const settingsStyles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  itemContainer: {
    padding: SIZES.padding,
  },
  item: {
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
});

export {styles, searchStyles, reservationStyles, settingsStyles};
