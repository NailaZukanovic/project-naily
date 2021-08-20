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
import {Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [mondayHours, setMondayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [tuesdayHours, setTuesdayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [wednesdayHours, setWednesdayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [thursdayHours, setThursdayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [fridayHours, setFridayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [saturdayHours, setSaturdayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [sundayHours, setSundayHours] = useState({
    startHour: 7,
    startMinute: 0,
    closeHour: 20,
    closeMinute: 0,
  });
  const [modalVisible, setModalVisiable] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [closeHour, setCloseHour] = useState(new Date());

  const [selectingDay, setSelectingDay] = useState(0);

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

  const convertHourToString = (hour, minute) => {
    var minuteString = minute.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    if (hour > 12) {
      return `${hour - 12}:${minuteString} PM`;
    } else {
      return `${hour}:${minuteString} AM`;
    }
  };

  const showTimePicker = (startHour, startMinute, closeHour, closeMinute) => {
    var initialStartHour = new Date();
    initialStartHour.setHours(startHour, startMinute);

    var initialCloseHour = new Date();
    initialCloseHour.setHours(closeHour, closeMinute);

    setStartHour(initialStartHour);
    setCloseHour(initialCloseHour);
    setModalVisiable(true);
  };

  const changeHoursModal = () => {
    const cancel = () => {
      setModalVisiable(false);
    };

    const accept = _ => {
      setModalVisiable(false);
      var chosenStartHour = startHour;
      var chosenCloseHour = closeHour;
      openHours[selectingDay].hourSet({
        startHour: chosenStartHour.getHours(),
        startMinute: chosenStartHour.getMinutes(),
        closeHour: chosenCloseHour.getHours(),
        closeMinute: chosenCloseHour.getMinutes(),
      });
    };

    const onStartHourChange = (event, datetime) => {
      setStartHour(datetime);
    };

    const onCloseHourChange = (event, datetime) => {
      setCloseHour(datetime);
    };

    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={cancel}>
        <View style={mainStyles.modalContainer}>
          <Text style={{...FONTS.h2, marginBottom: SIZES.margin}}>
            {openHours[selectingDay].title} open hours
          </Text>
          <View style={mainStyles.timePickerContainer}>
            <View style={mainStyles.timePickerGroup}>
              <Text style={mainStyles.timePickerTitle}>Start hour</Text>
              <DateTimePicker
                value={startHour}
                mode={'time'}
                display={'spinner'}
                onChange={onStartHourChange}
              />
            </View>
            <View style={mainStyles.timePickerGroup}>
              <Text style={mainStyles.timePickerTitle}>Close hour</Text>
              <DateTimePicker
                value={closeHour}
                mode={'time'}
                display={'spinner'}
                onChange={onCloseHourChange}
              />
            </View>
          </View>

          <TouchableOpacity style={mainStyles.modalButton} onPress={accept}>
            <Icon
              name="check"
              type="font-awesome"
              size={SIZES.iconSize}
              color={COLORS.green}
            />
            <Text style={FONTS.body2}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={mainStyles.modalButton} onPress={cancel}>
            <Icon
              name="close"
              type="font-awesome"
              size={SIZES.iconSize}
              color={COLORS.roseRed}
            />
            <Text style={FONTS.body2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={mainStyles.container}>
      <ScreenHeader
        title={'New Salon'}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
      {changeHoursModal()}
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

            {openHours.map((openHour, index) => {
              return (
                <View style={mainStyles.checkContainer}>
                  <CheckBox
                    checked={openHour.day}
                    style={{backgroundColor: COLORS.white}}
                    onPress={() => openHour.setDay(!openHour.day)}
                  />
                  <Text style={{flex: 1}}>{openHour.title}</Text>

                  <TouchableOpacity
                    style={{flex: 2}}
                    onPress={() => {
                      setSelectingDay(index);
                      showTimePicker(
                        openHour.hours.startHour,
                        openHour.hours.startMinute,
                        openHour.hours.closeHour,
                        openHour.hours.closeMinute,
                      );
                    }}>
                    <Text style={mainStyles.openHourText}>
                      {convertHourToString(
                        openHour.hours.startHour,
                        openHour.hours.startMinute,
                      )}{' '}
                      -{' '}
                      {convertHourToString(
                        openHour.hours.closeHour,
                        openHour.hours.closeMinute,
                      )}
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

  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width,
  },
  timePickerGroup: {
    justifyContent: 'center',
    flex: 1,
  },
  timePickerTitle: {
    textAlign: 'center',
    ...FONTS.h3,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  modalButton: {
    flexDirection: 'row',
    width: SIZES.oneQuarterWidth,
    margin: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
  },
});

export default SalonCreation;
