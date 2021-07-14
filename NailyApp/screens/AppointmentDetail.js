import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';
import {ScreenHeader} from '../components/index';

const AppointmentDetail = ({route, navigation}) => {
  const {date, time, status, salon, worker, product, requestMessage} =
    route.params;

  const [text, setText] = useState({requestMessage});

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <ScreenHeader
        title="Appointments"
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={mainStyle.container}>
          <View style={mainStyle.appointmentInformationContainer}>
            <View style={styles.lightShadow}>
              <Image
                source={worker.avatar}
                resizeMode="cover"
                style={mainStyle.image}
              />
            </View>

            <View style={{paddingHorizontal: SIZES.padding}}>
              <View style={mainStyle.iconContainer}>
                <Icon
                  name="person"
                  type="material-icon"
                  size={SIZES.smallIconSize}
                  style={mainStyle.icon}
                />
                <Text style={FONTS.h4}>{worker.name}</Text>
              </View>
              <View style={mainStyle.iconContainer}>
                <Icon
                  name="clock-o"
                  type="font-awesome"
                  size={SIZES.smallIconSize}
                  style={mainStyle.icon}
                />
                <Text>{`${date} @ ${time}`}</Text>
              </View>

              <View style={mainStyle.iconContainer}>
                <Icon
                  name="location-pin"
                  type="entypo"
                  size={SIZES.smallIconSize}
                  style={mainStyle.icon}
                />
                <Text
                  style={{
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>{`${salon.name} @ ${salon.address}`}</Text>
              </View>

              <Text
                style={{
                  ...FONTS.body3,
                  color:
                    status.message === 'Confirmed'
                      ? COLORS.green
                      : COLORS.orange,
                }}>{`${status.message}`}</Text>
            </View>
          </View>
        </View>

        <View style={mainStyle.container}>
          <View style={mainStyle.appointmentInformationContainer}>
            <View style={styles.lightShadow}>
              <Image
                source={product.image}
                resizeMode="cover"
                style={mainStyle.image}
              />
            </View>

            <View style={{paddingHorizontal: SIZES.padding}}>
              <View style={mainStyle.iconContainer}>
                <Icon
                  name="shoppingcart"
                  type="antdesign"
                  size={SIZES.smallIconSize}
                  style={mainStyle.icon}
                />
                <Text style={FONTS.h4}>{`${product.name}`}</Text>
              </View>

              <View style={mainStyle.iconContainer}>
                <Icon
                  name="dollar"
                  type="font-awesome"
                  size={SIZES.smallIconSize}
                  style={mainStyle.icon}
                />
                <Text>Starts from $13</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: SIZES.padding * 2}}>
          <Text style={FONTS.h3}>Request message</Text>

          <TextInput
            style={mainStyle.requestMessageText}
            multiline
            editable
            numberOfLines={6}
            maxLength={500}
            // value={requestMessage}
            // onChangeText={setText}
          />

          <View style={mainStyle.buttonGroupContainer}>
            <TouchableOpacity style={mainStyle.saveButton}>
              <Text style={mainStyle.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mainStyle.cancelButton}>
              <Icon
                name="cross"
                type="entypo"
                size={SIZES.iconSize}
                color={COLORS.white}
              />
              <Text style={mainStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingEnd: SIZES.padding,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.smallBorderRadius,
  },
  appointmentInformationContainer: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
  },
  requestMessageText: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.smallBorderRadius,
    color: COLORS.black,
    padding: SIZES.padding,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.green,
    padding: SIZES.padding,
    marginHorizontal: SIZES.smallMargin,
    borderRadius: SIZES.smallBorderRadius,
    ...styles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    padding: SIZES.padding,
    marginHorizontal: SIZES.smallMargin,
    borderRadius: SIZES.smallBorderRadius,
    ...styles.shadow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.roseRed,
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.body4,
    textAlign: 'center',
  },
});

export default AppointmentDetail;
