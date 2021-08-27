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
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../../constants/index';
import Swiper from 'react-native-swiper';
import {salonContact, salonImages, workers, comments} from '../../dummy/index';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {styles} from '../../styles/index';
import {
  ProductTab,
  WorkersTab,
  ReviewsTab,
  ContactTab,
  ScreenHeader,
} from '../../components/index';
import {useDispatch, useSelector} from 'react-redux';
import salonReducer from '../../redux/reducers/salonReducer';
import {hourFormat} from '../../utils';

const CustomTabBar = ({props}) => (
  <TabBar
    {...props}
    scrollEnabled
    style={mainStyles.tabBar}
    indicatorStyle={{backgroundColor: COLORS.darkPrimary, height: 2}}
    renderLabel={renderLabel}
  />
);
const renderLabel = ({route, focused, color}) => (
  <View>
    <Text
      style={focused ? mainStyles.activeTabTitle : mainStyles.inActiveTabTitle}>
      {route.title}
    </Text>
  </View>
);

const SalonDetail = ({navigation}) => {
  //TODO: NOTE
  //TODO: Only the owner of this salon
  //TODO: can turn on edit mode
  const salonDetail = useSelector(state => state.salonReducer.salonDetail);
  var {
    salonName,
    comments,
    workers,
    phoneNumber,
    address,
    openHours,
    featuredImages,
    products,
    isOwner,
    id,
  } = salonDetail;

  var openHourString = '';
  openHours.map(openHour => {
    console.log(openHour);
    openHourString += `${openHour.title}\t\t${hourFormat(
      openHour.hours.startHour,
      openHour.hours.startMinute,
    )} - ${hourFormat(openHour.hours.closeHour, openHour.hours.closeMinute)}\n`;
  });
  console.log(openHourString);

  var contact = {
    phoneNumber: phoneNumber,
    address: address,
    openHours: openHourString,
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'product', title: 'Product'},
    {key: 'workers', title: 'Workers'},
    {key: 'reviews', title: 'Reviews'},
    {key: 'contact', title: 'Contact'},
  ]);
  const renderScene = SceneMap({
    product: () => (
      <ProductTab
        products={products}
        navigation={navigation}
        isOwner={isOwner}
        salonId={id}
      />
    ),
    reviews: () => <ReviewsTab comments={comments} />,
    workers: () => <WorkersTab workers={workers} navigation={navigation} />,
    contact: () => <ContactTab contact={contact} />,
  });

  let isImageLoop = Platform.OS === 'android' ? false : true;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHeader
        title={salonName}
        shownBackArrow={true}
        optionButtonIcon={<Icon name="heart-o" type="font-awesome" />}
        onPressLeftButton={() => navigation.goBack()}
      />

      <View style={mainStyles.container}>
        {featuredImages.length > 0 ? (
          <Swiper
            loop={isImageLoop}
            paginationStyle={{bottom: -20}}
            dot={<View style={mainStyles.inActiveDot} />}
            activeDot={<View style={mainStyles.activeDot} />}>
            {featuredImages.map(uri => (
              <Image
                source={{uri: uri}}
                style={mainStyles.image}
                resizeMode="cover"
              />
            ))}
          </Swiper>
        ) : (
          <Image style={{...mainStyles.image, backgroundColor: COLORS.gray}} />
        )}
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

const mainStyles = StyleSheet.create({
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
