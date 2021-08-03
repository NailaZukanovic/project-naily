import React, {useState} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';

const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const goToSignIn = () => {
    navigation.navigate(SCREEN_NAMES.signin);
  };

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
                <Text style={FONTS.h4}>Username</Text>
                <TextInput
                  style={mainStyles.input}
                  onChangeText={setUsername}
                  value={username}
                />
              </View>

              <View style={mainStyles.inputGroup}>
                <Text style={FONTS.h4}>Password</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    secureTextEntry={true}
                    style={{...mainStyles.input, flex: 1}}
                    onChangeText={setPassword}
                    value={password}
                  />
                  <TouchableOpacity>
                    <Icon name="eye" type="feather" size={SIZES.iconSize} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={mainStyles.actionButton}>
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
});

export default Signup;
