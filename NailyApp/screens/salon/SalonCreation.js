import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../../constants/index';
import Swiper from 'react-native-swiper';
import {salonContact, salonImages, workers, comments} from '../../dummy/index';
import {Icon, CheckBox} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {styles} from '../../styles/index';
import {ScreenHeader} from '../../components/index';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';

const SalonCreation = ({navigation}) => {
  const [salonName, setSalonName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [monday, setMonday] = useState(true);
  const [tuesday, setTuesday] = useState(true);
  const [wednesday, setWednesday] = useState(true);
  const [thursday, setThursday] = useState(true);
  const [friday, setFriday] = useState(true);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [mondayHours, setMondayHours] = useState({start: 7, close: 20});
  const [tuesdayHours, setTuesdayHours] = useState({start: 7, close: 20});
  const [wednesdayHours, setWednesdayHours] = useState({start: 7, close: 20});
  const [thursdayHours, setThursdayHours] = useState({start: 7, close: 20});
  const [fridayHours, setFridayHours] = useState({start: 7, close: 20});
  const [saturdayHours, setSaturdayHours] = useState({start: 7, close: 20});
  const [sundayHours, setSundayHours] = useState({start: 7, close: 20});

  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
  const setDayArray = [
    setMonday,
    setTuesday,
    setWednesday,
    setThursday,
    setFriday,
    setSaturday,
    setSunday,
  ];
  const hours = [
    mondayHours,
    tuesdayHours,
    wednesdayHours,
    thursdayHours,
    fridayHours,
    saturdayHours,
    sundayHours,
  ];
  const hourSetArray = [
    setMondayHours,
    setTuesdayHours,
    setWednesdayHours,
    setThursdayHours,
    setFridayHours,
    setSaturdayHours,
    setSundayHours,
  ];
  const titleArray = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  var openHours = [];
  for (var i = 0; i < 7; i++) {
    openHours.push({
      title: titleArray[i],
      day: days[i],
      setDay: setDayArray[i],
      hours: hours[i],
      hourSet: hourSetArray[i],
    });
  }

  const convertToAmPm = hour => {
    if (hour > 12) {
      return `${hour - 12} PM`;
    } else {
      return `${hour} AM`;
    }
  };

  return (
    <SafeAreaView style={mainStyles.container}>
      <ScreenHeader
        title={'New Salon'}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={mainStyles.formContainer}>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Salon name</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={salonName}
              value={setSalonName}
            />
          </View>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Address</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={address}
              value={setAddress}
            />
          </View>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Phone number</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={phoneNumber}
              value={setPhoneNumber}
            />
          </View>
          <View>
            <Text style={FONTS.h4}>Open Hours</Text>

            {openHours.map(openHour => {
              return (
                <View style={mainStyles.checkContainer}>
                  <CheckBox
                    checked={openHour.day}
                    style={{backgroundColor: COLORS.white}}
                    onPress={() => openHour.setDay(!openHour.day)}
                  />
                  <Text style={{flex: 1}}>{openHour.title}</Text>

                  <TouchableOpacity style={{flex: 2}}>
                    <Text style={mainStyles.openHourText}>
                      {convertToAmPm(openHour.hours.start)} -{' '}
                      {convertToAmPm(openHour.hours.close)}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  formContainer: {
    margin: SIZES.margin,
  },
  inputGroup: {
    justifyContent: 'center',
    marginVertical: SIZES.smallMargin,
  },
  input: {
    height: 40,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderColor: COLORS.gray,
    borderWidth: 2,
    paddingHorizontal: SIZES.padding,
    color: COLORS.black,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.tinyMargin,
  },
  openHourText: {
    ...FONTS.body3,
    textAlign: 'center',
  },
});

export default SalonCreation;
