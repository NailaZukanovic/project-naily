import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  darkPrimary: '#560BAD',
  primary: '#7B2CBF', // violet
  secondary: '#EFEFEF', // light white

  // colors
  black: '#000000',
  darkBlue: '#2E3A59',
  white: '#FFFFFF',
  lightWhite: '#F2EFEF',

  lightViolet: '#A77ADD',

  roseRed: '#F72585',

  green: '#52B788',

  orange: '#FF8500',
  lightOrange: '#FFD8AE',
  gray: '#B0B5B3',
  lightGray: '#F5F5F5',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  transparent: 'transparent',
  darkgray: '#898C95',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  hugePadding: 20,
  largePadding: 15,
  padding: 10,
  smallPadding: 5,
  padding2: 12,
  margin5: 5,
  margin10: 10,
  margin15: 15,

  margin: 15,
  smallMargin: 10,
  tinyMargin: 5,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
  oneHalfWidth: width / 2,
  oneThirdWidth: width / 3,
  oneQuarterWidth: width / 4,

  oneHalfHeight: height / 2,
  oneThirdHeight: height / 3,
  oneQuarterHeight: height / 4,

  // border radius
  borderRadius: 15,
  smallBorderRadius: 10,
  tinyBorderRadius: 5,

  // Flatlist padding bottom to prevent overflows
  flatListPaddingBottom: 100,

  iconSize: 26,
  smallIconSize: 20,
  tinyIconSize: 15,
  superTinyIconSize: 10,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
  medium1: {fontFamily: 'Roboto-Medium', fontSize: SIZES.body1, lineHeight: 36},
  medium2: {fontFamily: 'Roboto-Medium', fontSize: SIZES.body2, lineHeight: 30},
  medium3: {fontFamily: 'Roboto-Medium', fontSize: SIZES.body3, lineHeight: 22},
  medium4: {fontFamily: 'Roboto-Medium', fontSize: SIZES.body4, lineHeight: 22},
  medium5: {fontFamily: 'Roboto-Medium', fontSize: SIZES.body5, lineHeight: 20},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
