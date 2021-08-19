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

const dummyData = [
  {
    id: 1,
    salon: 'Salon 1',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 2,
    salon: 'Salon 2',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 3,
    salon: 'Salon 3',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 4,
    salon: 'Salon 4',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 5,
    salon: 'Salon 5',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 6,
    salon: 'Salon 6',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 7,
    salon: 'Salon 7',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
  {
    id: 8,
    salon: 'Salon 8',
    address: 'Somethine in the middle of nowhere, NY, 14414',
  },
];

const SalonManagement = ({navigation}) => {
  const SalonItem = ({item}) => (
    <TouchableOpacity>
      <View style={mainStyles.salonItemContainer}>
        <View style={mainStyles.imageContainer}>
          <Image style={mainStyles.salonImage} />
        </View>
        <View style={mainStyles.textContainer}>
          <Text style={FONTS.h3}>{item.salon}</Text>
          <Text style={{...FONTS.body3, flex: 1, flexWrap: 'wrap'}}>
            {item.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={mainStyles.container}>
      <ScreenHeader
        title={'Salon Management'}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
        optionButtonIcon={
          <Icon
            name="plus-square-o"
            type="font-awesome"
            size={SIZES.iconSize}
          />
        }
        onPressRightButton={() =>
          navigation.navigate(SCREEN_NAMES.salonCreation)
        }
      />
      <FlatList
        style={mainStyles.salonList}
        showsVerticalScrollIndicator={false}
        data={dummyData}
        renderItem={SalonItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  salonList: {
    marginHorizontal: SIZES.margin,
  },
  salonItemContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.margin,
    flex: 1,
  },
  actions: {
    margin: SIZES.margin,
  },
  imageContainer: {},
  salonImage: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.gray,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.margin,
    marginVertical: SIZES.smallMargin,
  },
});

export default SalonManagement;
