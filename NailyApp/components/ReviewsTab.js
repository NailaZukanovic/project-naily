import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {styles} from '../styles/index';
import {LikesGroup, DislikesGroup} from './Common';

const ReviewsTab = props => {
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
        {props.comments != null && props.comments.length != 0 ? (
          props.comments.map(comment => <View>{renderItem(comment)}</View>)
        ) : (
          <View>
            <Text>There is no comments yet.</Text>
          </View>
        )}

        <TouchableOpacity
          style={{
            width: SIZES.width,
            padding: SIZES.padding,
          }}>
          <Text style={{...FONTS.body3, textAlign: 'right'}}>
            View 1344 more comments ...
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* TODO: add review text input */}
      {/* <View style={mainStyle.reviewTextInputContainer}>
        <TextInput placeholder="Add a review ... " />
        <TouchableOpacity style={mainStyle.submitButton}>
          <Icon
            name="arrow-up"
            type="font-awesome"
            size={SIZES.iconSize}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View> */}
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

export default ReviewsTab;
