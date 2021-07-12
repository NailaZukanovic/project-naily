import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles, reservationStyles} from '../styles/index';

import {discoverySalons, reservationData} from '../dummy/index';
import ScreenHeader from '../components/ScreenHeader';
import {TouchableOpacity} from 'react-native';

const renderReservationItem = ({item}) => (
  <TouchableOpacity style={mainStyle.container}>
    <View style={{...styles.shadow}}>
      <Image
        source={item.worker.avatar}
        style={mainStyle.avatar}
        resizeMode="cover"
      />
    </View>
    <View style={{paddingVertical: SIZES.padding, flex: 2}}>
      <Text style={{...FONTS.h4}}>{item.worker.name}</Text>
      <Text style={{...FONTS.h4}} numberOfLines={1}>
        {item.salon.name}
      </Text>
      <Text style={{...FONTS.body3}}>
        {item.date} @ {item.time}{' '}
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          color:
            item.status.code === 0
              ? COLORS.green
              : item.status.code === 1
              ? COLORS.orange
              : COLORS.roseRed,
        }}>
        {item.status.message}
      </Text>
    </View>
    <View>
      <Icon name="right" type="ant-design" size={SIZES.iconSize} />
    </View>
  </TouchableOpacity>
);

const ReservationList = props => (
  <FlatList
    data={props.reservations}
    renderItem={renderReservationItem}
    keyExtractor={item => item.id}
    showsHorizontalScrollIndicator={false}
  />
);

const Appointments = () => {
  return (
    <View style={styles.fullContainer}>
      <SafeAreaView>
        <ScreenHeader title="Appointments" />
        <View>
          <ReservationList reservations={reservationData} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.margin5,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginEnd: SIZES.margin10,
    borderRadius: SIZES.borderRadius,
  },
  detailButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
});

export default Appointments;
