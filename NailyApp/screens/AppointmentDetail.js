import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles} from '../styles/index';
import {ScreenHeader} from '../components/index';

import {discoverySalons} from '../dummy/index';

const AppointmentDetail = ({route, navigation}) => {
  const {date, time, status, salon, worker} = route.params;

  return (
    <SafeAreaView>
      <ScreenHeader
        title="Appointments"
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
      <View style={mainStyle.container}>
        <Image
          source={worker.avatar}
          resizeMode="cover"
          style={{width: SIZES.width, height: SIZES.oneQuarterHeight}}
        />
        <View style={mainStyle.informationContainer}>
          <Icon
            name="clock-o"
            type="font-awesome"
            style={{paddingHorizontal: SIZES.padding}}
            size={SIZES.smallIconSize}
          />
          <Text>{`${date} @ ${time}`}</Text>
        </View>

        <View style={mainStyle.informationContainer}>
          <Icon
            name="store"
            type="font-awesome-5"
            style={{paddingHorizontal: SIZES.padding}}
            size={SIZES.smallIconSize}
          />
          <Text>{`${date} @ ${time}`}</Text>
        </View>

        <TouchableOpacity>
          <View style={mainStyle.informationContainer}>
            <Icon
              name="location-outline"
              type="ionicon"
              style={{paddingHorizontal: SIZES.padding}}
              size={SIZES.smallIconSize}
            />
            <Text>{`${date} @ ${time}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  container: {},
  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
});

export default AppointmentDetail;
