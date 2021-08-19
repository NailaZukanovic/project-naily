import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../../constants/index';
import Swiper from 'react-native-swiper';
import {salonContact, salonImages, workers, comments} from '../../dummy/index';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {styles} from '../../styles/index';
import {ScreenHeader} from '../../components/index';
import {TouchableOpacity} from 'react-native';

const SalonEdit = ({navigation}) => {
  return (
    <SafeAreaView style={mainStyles.container}>
      <ScreenHeader
        title={'Salon Management'}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

const mainStyles = StyleSheet.create({
  container: {},
});

export default SalonEdit;
