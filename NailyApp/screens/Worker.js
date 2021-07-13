import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles} from '../styles/index';

import {discoverySalons} from '../dummy/index';

const WorkerDetail = () => {
  return (
    <View style={mainStyle.container}>
      <Text>Worker Screen</Text>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WorkerDetail;
