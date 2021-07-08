import React from 'react';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {ScreenHeader} from '../components/index';
import Swiper from 'react-native-swiper';
import {salonImages, products} from '../dummy/index';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FlatList} from 'react-native-gesture-handler';

const ProductTab = () => {
  const renderItem = ({item}) => (
    <View style={styles.productItem}>
      <Image
        source={item.image}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={{...FONTS.h4}}>{item.title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          type="font-awesome"
          size={15}
          color={COLORS.roseRed}
        />
        <Text style={{paddingStart: SIZES.padding, ...FONTS.body4}}>1.2k</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.productListContainer}>
      <FlatList
        style={styles.productList}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const WorkersTab = () => (
  <View>
    <Text> Workers Tab</Text>
  </View>
);

const ReviewsTab = () => (
  <View>
    <Text> Reviews Tab</Text>
  </View>
);

const ApoointmentTab = () => (
  <View>
    <Text> Appointment Tab</Text>
  </View>
);

const CustomTabBar = ({props}) => (
  <TabBar
    {...props}
    scrollEnabled
    style={styles.tabBar}
    indicatorStyle={{backgroundColor: COLORS.darkPrimary, height: 2}}
    renderLabel={renderLabel}
  />
);
const renderLabel = ({route, focused, color}) => (
  <View>
    <Text style={focused ? styles.activeTabTitle : styles.inActiveTabTitle}>
      {route.title}
    </Text>
  </View>
);

const SalonDetail = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'product', title: 'Product'},
    {key: 'reviews', title: 'Reviews'},
    {key: 'workers', title: 'Workers'},
    {key: 'reservations', title: 'Appointments'},
  ]);
  const renderScene = SceneMap({
    product: ProductTab,
    reviews: ReviewsTab,
    workers: WorkersTab,
    reservations: ApoointmentTab,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHeader
        title="Salon Detail"
        shownBackArrow={true}
        optionButton
        optionButtonIcon={<Icon name="phone" type="entypo" />}
      />
      <View style={styles.container}>
        <Swiper
          paginationStyle={{bottom: -20}}
          dot={<View style={styles.inActiveDot} />}
          activeDot={<View style={styles.activeDot} />}>
          {salonImages.map(item => (
            <Image source={item} style={styles.image} resizeMode="cover" />
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

const styles = StyleSheet.create({
  container: {
    height: '50%',
    marginBottom: SIZES.margin10 * 2,
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
  productListContainer: {
    flex: 1,
  },
  productList: {
    paddingHorizontal: SIZES.padding,
  },
  productItem: {
    padding: SIZES.padding,
    flex: 1,
  },
  productImage: {
    flex: 1,
    width: SIZES.width / 2 - 30,
    height: SIZES.width / 2,
  },
});

export default SalonDetail;
