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
import {signInAction} from '../redux/actions/authenticationActions';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('account0@email.com');
  const [password, setPassword] = useState('dummyaccountpassword0');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();
  const initialRender = useRef(true);

  const auth = useSelector(state => {
    return state.authenticationReducer.auth;
  });

  const showMessage = (message, buttonText) => {
    Alert.alert('Sign in failed', message, [
      {
        text: buttonText,
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (auth.token != null) {
        navigation.navigate(SCREEN_NAMES.profileCreation);
      } else if (auth.message != null) {
        showMessage(auth.message, 'Try again');
      }
    }
  }, [auth, navigation]);

  const goToSignup = () => {
    navigation.replace(SCREEN_NAMES.signup);
  };

  const signInClicked = useCallback(() => {
    const credential = {
      email: email,
      password: password,
    };
    dispatch(signInAction(credential));
  }, [email, password, dispatch]);

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
                <Text style={FONTS.h4}>Email</Text>
                <TextInput
                  style={mainStyles.input}
                  onChangeText={setEmail}
                  value={email}
                />
              </View>

              <View style={mainStyles.inputGroup}>
                <Text style={FONTS.h4}>Password</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    secureTextEntry={isPasswordHidden}
                    style={{...mainStyles.input, flex: 1}}
                    onChangeText={setPassword}
                    value={password}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                    <Icon
                      name={isPasswordHidden ? 'eye' : 'eye-off'}
                      type="feather"
                      size={SIZES.iconSize}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={signInClicked}
                style={{
                  ...mainStyles.actionButton,
                  backgroundColor: COLORS.orange,
                }}>
                <View>
                  <Text style={mainStyles.buttonText}>Sign in</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={mainStyles.actionButton}
                onPress={goToSignup}>
                <View>
                  <Text style={mainStyles.buttonText}>Sign up</Text>
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
    height: 40,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZES.padding,
    color: COLORS.black,
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
});

export default Signin;
