import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {ScreenHeader, AvailableTimePicker} from '../components/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';
import CalendarPicker from 'react-native-calendar-picker';

const StatsGroup = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: SIZES.smallPadding,
    }}>
    {props.icon}
    <Text style={{paddingStart: SIZES.padding, ...FONTS.body3}}>
      {props.message}
    </Text>
  </View>
);

const ProductPage = props => (
  <View>
    <Image
      source={props.image}
      style={{width: SIZES.width, height: SIZES.oneHalfHeight}}
      resizeMode="cover"
    />

    <View style={{alignItems: 'center', paddingVertical: SIZES.padding}}>
      <StatsGroup
        message={props.likes}
        icon={
          <Icon
            name="heart"
            type="font-awesome"
            color={COLORS.roseRed}
            size={SIZES.icon}
          />
        }
      />
      <StatsGroup
        icon={<Icon name="dollar-sign" type="font-awesome-5" />}
        message={'Starts from $13'}
      />

      <StatsGroup
        icon={<Icon name="clock-o" type="font-awesome" />}
        message={'About 15 minutes'}
      />
    </View>

    <View style={mainStyle.buttonContainer}>
      <TouchableOpacity
        style={mainStyle.button}
        onPress={props.nextPageFunction}>
        <Text style={mainStyle.buttonText}>Check Availability</Text>
        <Icon
          name="right"
          type="ant-design"
          size={SIZES.smallIconSize}
          color={COLORS.white}
          style={{paddingHorizontal: SIZES.smallPadding}}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const DateTimePickerPage = props => (
  <View style={{flex: 1}}>
    <CalendarPicker
      onDateChange={() => console.log('here')}
      style={{flex: 1}}
    />

    <AvailableTimePicker
      style={{flex: 1}}
      title={'Available times'}
      onPress={props.nextPageFunction}
    />
  </View>
);

const AvailableWorkersPage = props => (
  <View>
    <Text>Available Workers</Text>
  </View>
);

const ProductDetail = ({route, navigation}) => {
  const {title, likes, image} = route.params;
  const swiper = useRef(null);
  const nextPageFunction = () => {
    swiper.current.scrollBy(1, true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScreenHeader
        title={title}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
        optionButtonIcon={<Icon name="heart-o" type="font-awesome" />}
      />
      <Swiper loop={false} ref={swiper}>
        <ProductPage
          image={image}
          likes={likes}
          nextPageFunction={nextPageFunction}
        />
        <DateTimePickerPage nextPageFunction={nextPageFunction} />
        <AvailableWorkersPage />
      </Swiper>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
    ...styles.shadow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.smallBorderRadius,
    padding: SIZES.smallPadding * 1.5,
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
});

export default ProductDetail;
