import React, {useState, useCallback, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  COLORS,
  SIZES,
  FONTS,
  SCREEN_NAMES,
  NAVIGATOR_NAMES,
} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileAction} from '../redux/actions/profileActions';
import {PROFILE_EMPTY, PROFILE_FETCHED} from '../redux/actions';

const ProfileCreation = ({navigation}) => {
  const [firstname, setFirstName] = useState('Firstname Test');
  const [lastname, setLastName] = useState('Lastname test');
  const [phonenumber, setPhoneNumber] = useState('123131313');
  const [isProfileCreated, setIsProfileCreated] = useState(true);

  const dispatch = useDispatch();
  const actionType = useSelector(state => state.profileReducer.action.type);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(actionType);
    if (actionType == null) {
      dispatch(fetchProfileAction());
    } else {
      switch (actionType) {
        case PROFILE_FETCHED:
          navigation.replace(NAVIGATOR_NAMES.main);
          break;
        case PROFILE_EMPTY:
        default:
          setIsProfileCreated(false);
          break;
      }
    }
  }, [actionType, dispatch, navigation]);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#560BAD', '#9B65DA', '#4CC9F0']}>
      <SafeAreaView style={mainStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {isProfileCreated ? (
            <View
              style={{
                ...mainStyles.centeredGroup,
              }}>
              <ActivityIndicator color={COLORS.white} size="large" />
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                Fetching use profile
              </Text>
            </View>
          ) : (
            <View
              style={{
                ...mainStyles.centeredGroup,
              }}>
              <Text style={{...FONTS.h1, color: COLORS.white}}>
                Create Profile
              </Text>
              <View style={mainStyles.inputContainer}>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>First name</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setFirstName}
                    value={firstname}
                  />
                </View>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>Last name</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setLastName}
                    value={lastname}
                  />
                </View>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>Phone number</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setPhoneNumber}
                    value={phonenumber}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    ...mainStyles.actionButton,
                    backgroundColor: COLORS.orange,
                  }}>
                  <View>
                    <Text style={mainStyles.buttonText}>Create profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={goBack}
                  style={{
                    ...mainStyles.actionButton,
                  }}>
                  <View>
                    <Text style={mainStyles.buttonText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  centeredGroup: {
    paddingHorizontal: SIZES.largePadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.largePadding,
    borderRadius: SIZES.borderRadius,
    ...styles.shadow,
  },
  inputGroup: {
    justifyContent: 'center',
  },
  input: {
    height: 30,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZES.padding,
  },
  actionButton: {
    alignItems: 'center',
    padding: SIZES.smallPadding,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.green,
    ...styles.lightShadow,
    marginVertical: SIZES.margin,
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default ProfileCreation;
