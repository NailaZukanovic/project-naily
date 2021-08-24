import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {createSalonAction} from '../../redux/actions/salonActions';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../../constants/index';
import {Icon, CheckBox} from 'react-native-elements';
import {styles} from '../../styles/index';
import {ScreenHeader} from '../../components/index';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Swiper from 'react-native-swiper';

const SalonCreation = ({navigation}) => {
  const [salonName, setSalonName] = useState('Test new salon name');
  const [address, setAddress] = useState(
    '1234 Somwhere in the State, TX, 13311',
  );
  const [phoneNumber, setPhoneNumber] = useState('1231345669');
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
  const [featureImages, setFeatureImages] = useState([]);

  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [selectingImageIndex, setSelectingImageIndex] = useState(0);

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

  //Actions

  const dispatch = useDispatch();
  const submitSalonData = useCallback(() => {
    const data = {
      salonName: salonName,
      phoneNumber: phoneNumber,
      address: address,
      featureImages: featureImages,
    };

    console.log(data);

    dispatch(createSalonAction(data));
  }, [salonName, phoneNumber, address, featureImages, dispatch]);

  const showMessage = (title, message, buttonText) => {
    Alert.alert(title, message, [
      {
        text: buttonText,
        style: 'cancel',
      },
    ]);
  };

  const imageCallback = response => {
    if (response.errorMessage) {
      showMessage('Error', response.errorMessage, 'Ok');
    } else if (response.assets) {
      var images = [...featureImages];
      var isIos = Platform.OS === 'ios';
      response.assets.forEach(asset => {
        if (isIos) {
          asset.uri = asset.uri.replace('file://', '');
        }
        images.push(asset);
      });

      setFeatureImages(images);
    }
  };

  const options = {
    title: 'Change avatar',
  };

  const showImagePicker = () => {
    if (featureImages.length >= 5) {
      Alert.alert('Only 5 feature images are allowed', '', [
        {text: 'Okay', style: 'cancel'},
      ]);
      return;
    }

    Alert.alert('Add a new feature image', 'Pick a method', [
      {
        text: 'Take a picture',
        onPress: () => launchCamera(options, imageCallback),
        style: 'cancel',
      },
      {
        text: 'Open gallery',
        onPress: () => launchImageLibrary(options, imageCallback),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

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

  const renderTimePickerModal = () => {
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

  const renderImagePicker = () => {
    return (
      <View>
        <ScrollView>
          <Text style={FONTS.h4}>Featured images</Text>
          <View>
            {featureImages.map((image, index) => (
              <TouchableOpacity
                style={mainStyles.featureImageContainer}
                onPress={() => {
                  setSelectingImageIndex(index);
                  setImagePreviewVisible(true);
                }}>
                <Image
                  source={{uri: image.uri}}
                  style={mainStyles.featureImage}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={mainStyles.imageButtonGroup}>
            <TouchableOpacity
              style={mainStyles.imageActionButton}
              onPress={() => {
                setSelectingImageIndex(0);
                setImagePreviewVisible(true);
              }}>
              <Text style={{textAlign: 'center', ...FONTS.body2}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderImagePreviewModal = () => {
    const cancel = () => {
      setImagePreviewVisible(false);
    };

    const deleteCurrentImage = _ => {
      var images = [...featureImages];
      images.splice(selectingImageIndex, 1);
      setFeatureImages(images);
    };

    return (
      <Modal
        animationType="slide"
        visible={imagePreviewVisible}
        onRequestClose={cancel}
        style={mainStyles.modalContainer}>
        <View style={mainStyles.imagePreviewModalContainer}>
          <TouchableOpacity
            onPress={() => setImagePreviewVisible(false)}
            style={mainStyles.imagePreviewCloseButton}>
            <Icon name="close" type="font-awesome" size={SIZES.iconSize} />
          </TouchableOpacity>
          <View style={{height: SIZES.oneThirdHeight}}>
            <Swiper
              loop={false}
              paginationStyle={{bottom: -20}}
              index={selectingImageIndex}
              onIndexChanged={index => setSelectingImageIndex(index)}>
              {featureImages.length > 0 ? (
                featureImages.map(image => (
                  <Image
                    source={{uri: image.uri}}
                    resizeMode="cover"
                    style={mainStyles.imagePreview}
                  />
                ))
              ) : (
                <Text style={{...FONTS.h4, textAlign: 'center'}}>
                  No feature image to review {'\n'} You can add up to 5 feature
                  images
                </Text>
              )}
            </Swiper>
          </View>

          <View style={mainStyles.imagePreviewActionButtonGroup}>
            <TouchableOpacity
              onPress={showImagePicker}
              style={{
                ...mainStyles.imagePreviewActionButton,
                borderColor: COLORS.orange,
              }}>
              <Text style={mainStyles.imagePreviewActionText}>Add image</Text>
              <Icon
                name="plus"
                type="font-awesome"
                size={SIZES.iconSize}
                color={COLORS.orange}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteCurrentImage}
              style={{
                ...mainStyles.imagePreviewActionButton,
                borderColor: COLORS.roseRed,
              }}>
              <Text style={mainStyles.imagePreviewActionText}>Delete</Text>
              <Icon
                name="trash-o"
                type="font-awesome"
                size={SIZES.iconSize}
                color={COLORS.roseRed}
              />
            </TouchableOpacity>
          </View>
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
      {renderTimePickerModal()}
      {renderImagePreviewModal()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={mainStyles.formContainer}>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Salon name</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={setSalonName}
              value={salonName}
            />
          </View>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Address</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={setAddress}
              value={address}
            />
          </View>
          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Phone number</Text>
            <TextInput
              style={mainStyles.input}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
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

          {renderImagePicker()}
          <View style={mainStyles.imageButtonGroup}>
            <TouchableOpacity
              style={mainStyles.saveButton}
              onPress={submitSalonData}>
              <Text
                style={{
                  textAlign: 'center',
                  ...FONTS.body2,
                  color: COLORS.white,
                }}>
                Create new salon
              </Text>
            </TouchableOpacity>
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
  featureImageContainer: {
    marginVertical: SIZES.tinyMargin,
  },
  featureImage: {
    height: SIZES.oneQuarterHeight,
    marginVertical: SIZES.tinyMargin,
    borderRadius: SIZES.smallBorderRadius,
  },
  imageButtonGroup: {
    justifyContent: 'center',
    margin: SIZES.margin,
  },
  imageActionButton: {
    borderRadius: SIZES.borderRadius,
    borderColor: COLORS.orange,
    borderWidth: 2,
  },
  saveButton: {
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.green,
    ...styles.shadow,
    paddingVertical: SIZES.smallPadding,
  },
  imagePreviewModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imagePreview: {
    height: SIZES.oneThirdHeight,
  },
  imagePreviewActionButtonGroup: {
    marginVertical: SIZES.margin,
  },
  imagePreviewActionButton: {
    borderRadius: SIZES.borderRadius,
    borderWidth: 2,
    paddingHorizontal: SIZES.padding,
    width: SIZES.oneHalfWidth,
    marginVertical: SIZES.margin,
    flexDirection: 'row',
  },
  imagePreviewCloseButton: {
    alignItems: 'flex-end',
    width: '100%',
    padding: SIZES.padding * 2,
  },
  imagePreviewActionText: {
    textAlign: 'center',
    ...FONTS.body3,
    flex: 1,
  },
});

export default SalonCreation;
