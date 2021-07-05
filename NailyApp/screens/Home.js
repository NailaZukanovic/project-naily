import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles/index';

import {reservations, discoverySalons} from '../dummy/index';

registerCustomIconType('fa5', FontAwesome5);

const Home = () => {
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
          paddingBottom: SIZES.padding * 2,
        }}
        horizontal={true}
        data={reservationData}
        renderItem={renderReservationItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const renderDiscoveryItem = ({item}) => (
    <View
      style={{
        ...styles.shadow,
        margin: SIZES.margin5,
        borderRadius: SIZES.borderRadius,
        backgroundColor: COLORS.white,
        paddingBottom: SIZES.padding,
      }}>
      <Image
        style={{width: '100%', height: 200, borderRadius: SIZES.borderRadius}}
        source={item.image}
        resizeMode="cover"
      />
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.padding,
        }}>
        <Text style={{...FONTS.h3}}>{item.salon}</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="heart"
              type="ant-design"
              size={20}
              color={COLORS.roseRed}
            />
            <Text style={{margin: SIZES.margin5}}>1.2k</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="comment" size={20} color={COLORS.lightViolet} />
              <Text style={{margin: SIZES.margin5}}>1.2k</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        <Icon name="location-pin" color={COLORS.orange} size={18} />
        <Text
          style={{
            paddingStart: SIZES.padding,
          }}>
          {item.address}
        </Text>
      </View>
      {item.isReserved ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Icon
            name="circle"
            type="font-awesome"
            color={COLORS.orange}
            size={15}
          />
          <Text style={{...FONTS.body4, paddingStart: SIZES.padding}}>
            Reserved
          </Text>
        </View>
      ) : (
        <Text />
      )}
    </View>
  );

  const renderDiscoveryList = discoveryData => {
    return (
      <FlatList
        style={{
          paddingBottom: SIZES.margin15,
        }}
        horizontal
        data={discoveryData}
        renderItem={renderDiscoveryItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
      }}>
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
            source={require('../dummy/images/person1.jpeg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.secondary,
            }}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View>
            <View
              style={{
                margin: SIZES.margin10,
              }}>
              <Text style={{...FONTS.h3}}> Next Reservation</Text>

              {renderReservationList(reservations)}
            </View>

            {/* discovery section */}
          </View>

          <View
            style={{
              margin: SIZES.margin10,
            }}>
            <Text style={{...FONTS.h3}}> Discovery</Text>
            {renderDiscoveryList(discoverySalons)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
