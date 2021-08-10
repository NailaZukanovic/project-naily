import React, {useState, useCallback, useEffect, useRef} from 'react';

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
import {COLORS, SIZES, FONTS} from '../constants/index';
import {ScreenHeader} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../styles';
import {updateProfileAction} from '../redux/actions/profileActions';

const Profile = ({navigation}) => {
  const profile = useSelector(state => state.profileReducer.profile);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const showMessage = (title, message, buttonText) => {
    Alert.alert(title, message, [
      {
        text: buttonText,
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
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
            <Image style={mainStyles.avatarImage} />
            <TouchableOpacity style={mainStyles.editAvatarButton}>
              <Text style={FONTS.body2}>Edit</Text>
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
    width: 180,
    height: 180,
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
