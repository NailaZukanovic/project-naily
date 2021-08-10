import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/index';

import {discoverySalons} from '../dummy/index';

import {useDispatch, useSelector} from 'react-redux';
import {fetchSalonListAction} from '../redux/actions/salonActions';

registerCustomIconType('fa5', FontAwesome5);

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const salons = useSelector(state => state.salonReducer.salons);
  console.log(salons);

  useEffect(() => {
    dispatch(fetchSalonListAction());
  }, [dispatch]);

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
            style={mainStyles.salonImage}
            source={discoverySalons[0].image}
            resizeMode="cover"
          />
        </View>
        <View style={mainStyles.titleGroup}>
          <Text style={{...FONTS.h3}}>{item.data.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={mainStyles.statGroup}>
              <Icon
                name="heart"
                type="ant-design"
                size={15}
                color={COLORS.roseRed}
              />
              <Text style={{margin: SIZES.margin5}}>{item.data.loves}</Text>
            </View>
            <View>
              <View style={mainStyles.statGroup}>
                <Icon name="comment" size={20} color={COLORS.lightViolet} />
                <Text style={{margin: SIZES.margin5}}>
                  {item.data.reviewCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              paddingStart: SIZES.padding,
            }}>
            {item.data.address}
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
        data={discoveryData}
        renderItem={renderDiscoveryItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const ExploreList = () => (
    <View
      style={{
        margin: SIZES.margin,
      }}>
      {renderDiscoveryList(salons)}
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

const mainStyles = StyleSheet.create({
  container: {
    ...styles.shadow,
    backgroundColor: COLORS.primary,
    padding: SIZES.padding * 2,
    borderRadius: SIZES.borderRadius,
    marginHorizontal: SIZES.margin5,
    flexWrap: 'wrap',
  },
  salonImage: {
    width: '100%',
    height: 180,
    borderRadius: SIZES.borderRadius,
  },
  titleGroup: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
