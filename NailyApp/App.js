/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS} from './constants/index';
import {Icon} from 'react-native-elements';
import {registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {reservations} from './dummy/index';

registerCustomIconType('fa5', FontAwesome5);

const App = () => {
  const renderReservationItem = ({item}) => (
    <View
      style={{
        ...styles.shadow,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding * 2,
        borderRadius: SIZES.borderRadius,
        marginHorizontal: SIZES.margin5,
        flexWrap: 'wrap',
      }}>
      <Text style={{...FONTS.h3, color: COLORS.secondary}}> {item.salon} </Text>
      <Text style={{...FONTS.body3, color: COLORS.secondary}}>
        {' '}
        {item.worker}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon
          name="calendar-check-o"
          type="font-awesome"
          size={20}
          color={COLORS.secondary}
        />
        <Text style={{...FONTS.body4, color: COLORS.secondary}}>
          {item.date} @ {item.time}
        </Text>
      </View>
    </View>
  );

  const renderReservationList = reservationData => {
    return (
      <FlatList
        style={{
          paddingBottom: SIZES.margin15,
        }}
        horizontal={true}
        data={reservationData}
        renderItem={renderReservationItem}
        keyExtractor={item => item.id}
      />
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.darkPrimary,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: SIZES.padding * 2,
          }}>
          <View>
            <Text style={{...FONTS.h1, color: COLORS.secondary}}>
              {' '}
              GOOD MORNING,
            </Text>
            <Text style={{...FONTS.h1, color: COLORS.secondary}}> NGUYEN</Text>
          </View>
          <View
            style={{
              ...styles.shadow,
              flexDirection: 'row',
              marginTop: SIZES.margin10,
            }}>
            <Icon
              name="calendar"
              type="font-awesome"
              size={20}
              color={COLORS.secondary}
            />
            <View
              style={{
                borderRadius: SIZES.borderRadius,
                backgroundColor: COLORS.primary,
                paddingHorizontal: SIZES.padding,
                marginStart: SIZES.margin10,
              }}>
              <Text style={{...FONTS.body4, color: COLORS.secondary}}>
                Nov 15
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.shadow,
            paddingEnd: SIZES.padding * 2,
          }}>
          <Image
            source={require('./dummy/images/person1.jpeg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.secondary,
            }}
          />
        </View>
      </View>

      {/* <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{heigh: 50, flexDirection: 'row'}}>
          <Icon name="arrow-left" type="font-awesome" color={COLORS.black} />
        </TouchableOpacity>
        <Text>Something </Text>
      </View> */}

      {/* body */}

      <View
        style={{
          margin: SIZES.margin10,
        }}>
        <Text style={{...FONTS.h3}}> Next Reservation</Text>

        {/* {re{renderReservationList(reservations)}nderReservationItem()} */}
        {renderReservationList(reservations)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 15,
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});

export default App;
