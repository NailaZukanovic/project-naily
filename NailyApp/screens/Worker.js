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
import {ScreenHeader} from '../components/index';

import {discoverySalons} from '../dummy/index';

const WorkerDetail = ({route, navigation}) => {
  const {date, time, status, salon, worker} = route.params;

  return (
    <SafeAreaView>
      <View>
        <Text>Worker Detail</Text>
      </View>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  container: {},
});

export default WorkerDetail;
