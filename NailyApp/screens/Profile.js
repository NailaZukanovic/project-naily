import React, {useState, useCallback, useEffect} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {ScreenHeader} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../styles';
import {
  updateProfileAction,
  uploadAvatarAction,
} from '../redux/actions/profileActions';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import apiConfig from '../constants/apiConfig';

const Profile = ({navigation}) => {
  const profile = useSelector(state => state.profileReducer.profile);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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
      console.log(response.assets[0]);
      var imageObject = response.assets[0];
      if (Platform.OS === 'ios') {
        imageObject.uri = imageObject.uri.replace('file://', '');
      }
      dispatch(uploadAvatarAction(imageObject));
    }
  };

  const options = {
    title: 'Change avatar',
  };

  const showEditAvatarActions = () => {
    Alert.alert('Avatar', 'Pick a method', [
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

  useEffect(() => {
    console.log('useEffect');
    loadProfile();
  }, [profile]);

  const saveUpdateClicked = useCallback(() => {
    const data = {
      firstname: firstName,
      lastname: lastName,
      phonenumber: phoneNumber,
      username: username,
    };
    console.log(data);
    dispatch(updateProfileAction(data));
  }, [firstName, lastName, phoneNumber, username, dispatch]);

  const loadProfile = () => {
    setUsername(profile.username);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setPhoneNumber(profile.phoneNumber);
    //TODO: this is a special treatment for avatarUrl
    //TODO: to convert localhost to server local IP address
    //TODO: do not use this code in production
    //TODO: USE THIS INSTEAD
    // setAvatarUrl(profile.avatarUrl);
    if (profile.avatarUrl != null) {
      setAvatarUrl(profile.avatarUrl.replace('localhost', apiConfig.localhost));
    }
  };
  return (
    <SafeAreaView style={mainStyles.container}>
      <ScreenHeader
        title={'Edit Profile'}
        shownBackArrow
        onPressLeftButton={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={mainStyles.centeredGroup}>
          <View style={mainStyles.avatarGroup}>
            <Image
              style={mainStyles.avatarImage}
              source={avatarUrl ? {uri: avatarUrl} : {}}
            />
            <TouchableOpacity
              style={mainStyles.editAvatarButton}
              onPress={showEditAvatarActions}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="camera"
                  type="feather"
                  style={{marginEnd: SIZES.margin}}
                />
                <Text style={FONTS.body3}>Change</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={mainStyles.nameInputGroup}>
            <View style={{flex: 1}}>
              <Text style={FONTS.h4}>First name</Text>
              <TextInput
                onChangeText={setFirstName}
                value={firstName}
                style={mainStyles.input}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={FONTS.h4}>Last name</Text>
              <TextInput
                onChangeText={setLastName}
                value={lastName}
                style={mainStyles.input}
              />
            </View>
          </View>

          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Username</Text>
            <TextInput
              onChangeText={setUsername}
              value={username}
              style={mainStyles.input}
            />
          </View>

          <View style={mainStyles.inputGroup}>
            <Text style={FONTS.h4}>Phone number</Text>
            <TextInput
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              style={mainStyles.input}
            />
          </View>

          <TouchableOpacity
            style={mainStyles.saveButton}
            onPress={saveUpdateClicked}>
            <Text style={{...FONTS.body2, color: COLORS.white}}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    flex: 1,
  },
  keyboardAvoidingView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centeredGroup: {
    paddingHorizontal: SIZES.largePadding,
  },
  avatarGroup: {
    alignItems: 'center',
    paddingVertical: SIZES.largePadding,
    ...styles.lightShadow,
  },
  inputGroup: {
    paddingVertical: SIZES.largePadding,
  },

  nameInputGroup: {
    flexDirection: 'row',
    paddingVertical: SIZES.largePadding,
  },
  input: {
    height: 30,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    marginHorizontal: SIZES.smallMargin,
    paddingHorizontal: SIZES.padding,
  },
  avatarImage: {
    backgroundColor: COLORS.gray,
    width: 100,
    height: 100,
    borderRadius: SIZES.borderRadius,
  },
  editAvatarButton: {
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.largePadding,
    marginVertical: SIZES.margin,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  saveButton: {
    ...styles.lightShadow,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    borderRadius: SIZES.borderRadius,
    margin: SIZES.hugeMargin,
  },
});

export default Profile;
