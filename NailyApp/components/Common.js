import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';

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

export {LikesGroup, DislikesGroup};
