import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  SCrollView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {ScreenHeader} from '../components/index';
import Swiper from 'react-native-swiper';
import {
  salonContact,
  salonImages,
  products,
  workers,
  comments,
} from '../dummy/index';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {styles} from '../styles/index';

const LikesGroup = ({likes}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.smallPadding,
    }}>
    <Icon
      name="heart"
      type="font-awesome"
      size={SIZES.smallIconSize}
      color={COLORS.roseRed}
    />
    <Text style={{paddingStart: SIZES.padding, ...FONTS.body4}}>{likes}</Text>
  </View>
);

const DislikesGroup = ({dislikes}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.smallPadding,
    }}>
    <Icon
      name="thumbs-o-down"
      type="font-awesome"
      size={SIZES.smallIconSize}
      color={COLORS.darkBlue}
    />
    <Text style={{paddingStart: SIZES.padding, ...FONTS.body4}}>
      {dislikes}
    </Text>
  </View>
);

const ProductTab = () => {
  const renderItem = ({item}) => (
    <View style={mainStyle.productItem}>
      <View style={styles.lightShadow}>
        <Image
          source={item.image}
          style={mainStyle.productImage}
          resizeMode="cover"
        />
      </View>

      <Text style={{...FONTS.h4}}>{item.title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          type="font-awesome"
          size={15}
          color={COLORS.roseRed}
        />
        <Text style={{paddingStart: SIZES.padding, ...FONTS.body4}}>
          {item.likes}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={mainStyle.listContainer}>
      <FlatList
        style={mainStyle.productList}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const WorkersTab = () => {
  const renderItem = ({item}) => (
    <View style={mainStyle.workerItemContainer}>
      <Image source={item.image} style={mainStyle.workerAvatar} />
      <View style={mainStyle.workerDataContainer}>
        <View>
          <Text style={{...FONTS.h4}}>{item.name}</Text>
          {item.features.map(feature => (
            <Text>{feature}</Text>
          ))}
          <LikesGroup likes={item.likes} />
        </View>
        <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
          {item.skills.map(skill => (
            <View
              style={{
                backgroundColor: COLORS.orange,
                borderRadius: SIZES.borderRadius,
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.margin5,
              }}>
              <Text style={{...FONTS.body4, color: COLORS.white}}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={mainStyle.listContainer}>
      <FlatList
        data={workers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ReviewsTab = () => {
  const renderItem = item => (
    <View style={mainStyle.reviewItem}>
      <View style={{backgroundColor: COLORS.secondary, padding: SIZES.padding}}>
        <Text>{`"${item.content}"`}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <LikesGroup likes={item.likes} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <DislikesGroup dislikes={item.dislikes} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: 'right',
            ...FONTS.body4,
            flex: 2,
          }}>{`- ${item.commenter} -`}</Text>
      </View>
    </View>
  );
  return (
    <View style={mainStyle.listContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {comments.map(comment => (
          <View>{renderItem(comment)}</View>
        ))}

        <TouchableOpacity
          style={{
            width: SIZES.width,
            padding: SIZES.padding,
          }}>
          <Text style={{...FONTS.body2, textAlign: 'right'}}>1344 more...</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const ContactTab = () => (
  <View style={mainStyle.contactContainer}>
    <TouchableOpacity style={mainStyle.contactItem}>
      <Icon name="location-pin" type="entypo" color={COLORS.primary} />
      <Text style={mainStyle.contactText}>{salonContact.address}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={mainStyle.contactItem}>
      <Icon name="clock-o" type="font-awesome" color={COLORS.primary} />
      <Text style={mainStyle.contactText}>Monday 8AM - 10PM</Text>
    </TouchableOpacity>

    <TouchableOpacity style={mainStyle.contactItem}>
      <Icon name="phone" type="font-awesome" color={COLORS.primary} />
      <Text style={mainStyle.contactText}>{salonContact.phone}</Text>
    </TouchableOpacity>
  </View>
);

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
    product: ProductTab,
    reviews: ReviewsTab,
    workers: WorkersTab,
    contact: ContactTab,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHeader
        title="Salon Detail"
        shownBackArrow={true}
        optionButton
        optionButtonIcon={<Icon name="heart-o" type="font-awesome" />}
        onPressLeftButton={() => navigation.goBack()}
      />

      <View style={mainStyle.container}>
        <Swiper
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
    padding: SIZES.padding,
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
});

export default SalonDetail;
