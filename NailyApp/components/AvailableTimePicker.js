import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SIZES, FONTS} from '../constants/index';
import {ScrollView} from 'react-native-gesture-handler';
import {availableTimeSlots} from '../dummy/index';

const TimeSlot = props => {
  //   let time = props.isAM ? props.time : `${props.time} PM`;

  return (
    <TouchableOpacity style={mainStyle.item} onPress={props.onPress}>
      <View style={{flex: 1}}>
        <Text>{props.time}</Text>
      </View>
      <View style={{flex: 4, flexDirection: 'row'}}>
        {props.avatar.map(avatar => (
          <Image
            source={avatar}
            resizeMode="cover"
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const AvailableTimePicker = props => {
  return (
    <View style={{...mainStyle.container, ...props.style}}>
      <Text style={{...FONTS.h4}}>{props.title}</Text>
      <ScrollView style={{flex: 1}}>
        {availableTimeSlots.map(slot => (
          <TimeSlot
            time={slot.time}
            avatar={slot.avatar}
            onPress={props.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 2,
  },
  item: {
    padding: SIZES.padding,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AvailableTimePicker;
