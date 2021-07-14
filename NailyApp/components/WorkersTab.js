import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {styles} from '../styles/index';
import {LikesGroup} from './Common';

const onWorkerPressed = workerId => {
  //TODO: make API call to retrieve worker data
};

const WorkersTab = props => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={mainStyle.workerItemContainer}
      onPress={props.onPress}>
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
    </TouchableOpacity>
  );

  return (
    <View style={mainStyle.listContainer}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
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

export default WorkersTab;
