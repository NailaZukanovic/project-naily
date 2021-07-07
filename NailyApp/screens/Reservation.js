import React from 'react';
import {SafeAreaView, Text, View, FlatList, Image} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles, searchStyles, reservationStyles} from '../styles/index';

import {discoverySalons, reservationData} from '../dummy/index';
import ScreenHeader from '../components/ScreenHeader';

const renderReservationItem = ({item}) => (
  <View style={reservationStyles.itemContainer}>
    <View style={{...styles.shadow}}>
      <Image
        source={item.worker.avatar}
        style={reservationStyles.workerImage}
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

    <View style={reservationStyles.detailButtonContainer}>
      <Icon name="right" type="ant-design" />
    </View>
  </View>
);

const ReservationList = props => (
  <FlatList
    data={props.reservations}
    renderItem={renderReservationItem}
    keyExtractor={item => item.id}
    showsHorizontalScrollIndicator={false}
  />
);

const Reservation = () => {
  return (
    <View style={styles.fullContainer}>
      <SafeAreaView>
        <ScreenHeader title="Reservations" />
        <View>
          <ReservationList reservations={reservationData} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Reservation;
