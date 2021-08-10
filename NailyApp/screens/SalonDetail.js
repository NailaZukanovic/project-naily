import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {ScreenHeader} from '../components/index';
import Swiper from 'react-native-swiper';
import {salonContact, salonImages, workers, comments} from '../dummy/index';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {styles} from '../styles/index';
import {
  ProductTab,
  WorkersTab,
  ReviewsTab,
  ContactTab,
} from '../components/index';

const CustomTabBar = ({props}) => (
  <TabBar
    {...props}
    scrollEnabled
    style={mainStyle.tabBar}
    indicatorStyle={{backgroundColor: COLORS.darkPrimary, height: 2}}
    renderLabel={renderLabel}
  />
);
const renderLabel = ({route, focused, color}) => (
  <View>
    <Text
      style={focused ? mainStyle.activeTabTitle : mainStyle.inActiveTabTitle}>
      {route.title}
    </Text>
  </View>
);

const SalonDetail = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'product', title: 'Product'},
    {key: 'workers', title: 'Workers'},
    {key: 'reviews', title: 'Reviews'},
    {key: 'contact', title: 'Contact'},
  ]);
  const renderScene = SceneMap({
    product: () => <ProductTab navigation={navigation} />,
    reviews: () => <ReviewsTab comments={comments} />,
    workers: () => <WorkersTab data={workers} navigation={navigation} />,
    contact: () => <ContactTab contact={salonContact} />,
  });

  let isImageLoop = Platform.OS === 'android' ? false : true;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHeader
        title="Salon Detail"
        shownBackArrow={true}
        optionButtonIcon={<Icon name="heart-o" type="font-awesome" />}
        onPressLeftButton={() => navigation.goBack()}
      />

      <View style={mainStyle.container}>
        <Swiper
          loop={isImageLoop}
          paginationStyle={{bottom: -20}}
          dot={<View style={mainStyle.inActiveDot} />}
          activeDot={<View style={mainStyle.activeDot} />}>
          {salonImages.map(item => (
            <Image source={item} style={mainStyle.image} resizeMode="cover" />
          ))}
        </Swiper>
      </View>
      <View style={{flex: 2}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: '100%'}}
          renderTabBar={props => <CustomTabBar props={props} />}
          style={{backgroundColor: COLORS.white}}
        />
      </View>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    height: '50%',
    marginBottom: SIZES.margin * 2,
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkPrimary,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inActiveDot: {
    backgroundColor: COLORS.gray,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: COLORS.orange,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  tabBar: {
    backgroundColor: COLORS.white,
  },
  activeTabTitle: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  inActiveTabTitle: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  listContainer: {
    flex: 1,
  },
  productItem: {
    padding: SIZES.padding,
    flex: 1,
  },
  productImage: {
    width: SIZES.width / 2 - 20,
    height: SIZES.width / 2,
    borderRadius: SIZES.smallBorderRadius,
  },
  workerItemContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.smallMargin,
    marginVertical: SIZES.tinyMargin,
    ...styles.lightShadow,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.white,
  },
  workerDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  workerAvatar: {
    width: 100,
    height: 100,
    borderRadius: SIZES.smallBorderRadius,
  },
  reviewItem: {
    marginVertical: SIZES.smallMargin,
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  contactContainer: {
    padding: SIZES.smallPadding,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  contactText: {
    ...FONTS.body3,
    paddingStart: SIZES.padding,
  },
  reviewTextInputContainer: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: SIZES.padding,
  },
});

export default SalonDetail;
