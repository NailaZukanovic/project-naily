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
  Alert,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {signUpAction} from '../redux/actions/authenticationActions';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';

const Signup = ({navigation}) => {
  const initialRender = useRef(true);
  const [email, setEmail] = useState('nguyen@email.com');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState('custompassword');
  const [repeatPassword, setRepeatPassword] = useState('custompassword');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  const goToSignIn = () => {
    navigation.replace(SCREEN_NAMES.signin);
  };

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validatePassword = (password, repeatPassword) => {
    if (password === repeatPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const onEmailTextChanged = text => {
    console.log(text);
    setEmail(text);
    validateEmail(email);
  };

  const onPasswordChanged = text => {
    setPassword(text);
    validatePassword(text, repeatPassword);
  };

  const onRepeatPasswordChanged = text => {
    setRepeatPassword(text);
    validatePassword(password, text);
  };

  const showMessage = (title, message, buttonText) => {
    Alert.alert(title, message, [
      {
        text: buttonText,
        style: 'cancel',
      },
    ]);
  };

  const auth = useSelector(state => state.authenticationReducer.auth);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (auth.token != null) {
        showMessage('Message', auth.message, 'Okay');
      } else if (auth.message != null) {
        showMessage('Message', auth.message, 'Try again');
      }
    }
  }, [auth, navigation]);

  const signUpClicked = useCallback(() => {
    if (isEmailValid && isPasswordValid) {
      dispatch(signUpAction({email: email, password: password}));
    } else {
      showMessage('Message', "Invalid information. Can't sign up", 'Try again');
    }
  }, [isEmailValid, isPasswordValid, dispatch]);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#560BAD', '#9B65DA', '#4CC9F0']}>
      <SafeAreaView style={mainStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={mainStyles.centeredGroup}>
            <Text style={mainStyles.nailyLogo}>Naily</Text>

            <View style={mainStyles.inputContainer}>
              <View style={mainStyles.inputGroup}>
                <View style={mainStyles.titleGroup}>
                  <Text style={FONTS.h4}>Email</Text>
                  <Text
                    style={
                      isEmailValid ? mainStyles.validText : mainStyles.errorText
                    }>
                    {isEmailValid ? 'Okay' : 'Invalid email format'}
                  </Text>
                </View>
                <TextInput
                  style={mainStyles.input}
                  onChangeText={onEmailTextChanged}
                  value={email}
                />
              </View>

              <View style={mainStyles.inputGroup}>
                <View style={mainStyles.titleGroup}>
                  <Text style={FONTS.h4}>Password</Text>
                  <Text
                    style={
                      isPasswordValid
                        ? mainStyles.validText
                        : mainStyles.errorText
                    }>
                    {isPasswordValid ? 'Okay' : "Password doesn't match"}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    secureTextEntry={isPasswordHidden}
                    style={{...mainStyles.input, flex: 1}}
                    onChangeText={onPasswordChanged}
                    value={password}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsPasswordHidden(!isPasswordHidden);
                    }}>
                    <Icon
                      name={isPasswordHidden ? 'eye' : 'eye-off'}
                      type="feather"
                      size={SIZES.iconSize}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={mainStyles.inputGroup}>
                <Text style={FONTS.h4}>Type password again</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    secureTextEntry={isPasswordHidden}
                    style={{...mainStyles.input, flex: 1}}
                    onChangeText={onRepeatPasswordChanged}
                    value={repeatPassword}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsPasswordHidden(!isPasswordHidden);
                    }}>
                    <Icon
                      name={isPasswordHidden ? 'eye' : 'eye-off'}
                      type="feather"
                      size={SIZES.iconSize}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={mainStyles.actionButton}
                onPress={signUpClicked}>
                <View>
                  <Text style={mainStyles.buttonText}>Sign up</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...mainStyles.actionButton,
                  backgroundColor: COLORS.orange,
                }}
                onPress={goToSignIn}>
                <View>
                  <Text style={mainStyles.buttonText}>Had an account?</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={FONTS.body3}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    alignItems: 'center',
  },
  centeredGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nailyLogo: {
    ...FONTS.bigNaily,
    color: COLORS.pink,
    marginBottom: SIZES.margin * 2,
  },
  inputContainer: {
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
    width: 300,
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
  forgotPasswordButton: {
    marginTop: SIZES.margin * 2,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    paddingStart: SIZES.padding,
    color: COLORS.roseRed,
  },
  validText: {
    paddingStart: SIZES.padding,
    color: COLORS.green,
  },
});

export default Signup;
