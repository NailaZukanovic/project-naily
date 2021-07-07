import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles, reservationStyles} from '../styles/index';

import {discoverySalons, reservationData} from '../dummy/index';

const ScreenHeader = props => (
  <View style={{...styles.header}}>
    <Text style={{...FONTS.h1}}>{props.title}</Text>
  </View>
);

export default ScreenHeader;
