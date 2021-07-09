import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {searchStyles, styles} from '../styles/index';

import {reservations, discoverySalons} from '../dummy/index';

registerCustomIconType('fa5', FontAwesome5);

const Home = ({navigation}) => {
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
    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAMES.salon)}>
      <View
        style={{
          // ...styles.shadow,
          margin: SIZES.margin5,
          borderRadius: SIZES.borderRadius,
          backgroundColor: COLORS.white,
          paddingBottom: SIZES.padding,
        }}>
        <View style={styles.shadow}>
          <Image
            style={{
              width: '100%',
              height: 180,
              borderRadius: SIZES.borderRadius,
            }}
            source={item.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
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
                size={15}
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
          }}>
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
            }}>
            <Text
              style={{
                ...FONTS.medium3,
                paddingStart: SIZES.padding,
                color: COLORS.green,
              }}>
              3 appointments
            </Text>
          </View>
        ) : (
          <Text />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderDiscoveryList = discoveryData => {
    return (
      <FlatList
        style={{
          paddingBottom: SIZES.margin15,
        }}
        // horizontal
        data={discoveryData}
        renderItem={renderDiscoveryItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  // render next reservertion
  const NextReservationList = () => (
    <View>
      <View
        style={{
          margin: SIZES.margin10,
        }}>
        <Text style={{...FONTS.h3}}>Next Reservation</Text>

        {renderReservationList(reservations)}
      </View>
    </View>
  );

  const ExploreList = () => (
    <View
      style={{
        margin: SIZES.margin10,
      }}>
      {renderDiscoveryList(discoverySalons)}
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <View
        style={{
          backgroundColor: COLORS.white,
          paddingBottom: SIZES.flatListPaddingBottom,
        }}>
        <Text style={{...FONTS.h1}}>Explore</Text>
        <ExploreList />
      </View>
    </SafeAreaView>
  );
};

export default Home;
