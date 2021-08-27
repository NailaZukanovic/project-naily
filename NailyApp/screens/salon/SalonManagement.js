import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../../styles/index';
import {ScreenHeader} from '../../components/index';
import {TouchableOpacity} from 'react-native';

import {
  fetchMySalonsAction,
  selectMySalonAtIndex,
} from '../../redux/actions/salonActions';

const SalonManagement = ({navigation}) => {
  const mySalons = useSelector(state => state.salonReducer.mySalons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMySalonsAction());
  }, [dispatch]);

  const selectSalon = useCallback(
    index => {
      dispatch(selectMySalonAtIndex(index));
      //Compose the salon details
      // var contact = {
      //   phoneNumber: item.contact,
      //   address: item.address,
      //   openHours: item.openHours.map(openHour => {
      //     return openHour.isOpen
      //       ? `${openHour.title} ${openHour.hours.startHour}:${openHour.hours.startMinute} - ${openHour.hours.closeHour}:${openHour.hours.closeMinute}\n`
      //       : '';
      //   }),
      // };

      navigation.navigate(SCREEN_NAMES.salon);
      // navigation.navigate(SCREEN_NAMES.salon, {
      //   salonName: item.salonName ? item.salonName : 'Salon Detail',
      //   workers: item.workers ? item.workers : [],
      //   comments: item.comments ? item.comments : [],
      //   contact: contact,
      //   isEditMode: true,
      // });
    },
    [dispatch, navigation],
  );

  const SalonItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        selectSalon(index);
      }}>
      <View style={mainStyles.salonItemContainer}>
        <View style={mainStyles.imageContainer}>
          <Image
            style={mainStyles.salonImage}
            source={{uri: item.featuredImages[0]}}
          />
        </View>
        <View style={mainStyles.textContainer}>
          <Text style={FONTS.h3}>{item.salonName}</Text>
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
        data={mySalons}
        renderItem={SalonItem}
        keyExtractor={(item, index) => index.toString()}
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
