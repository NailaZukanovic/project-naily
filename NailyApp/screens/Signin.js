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
  const [text, onChangeText] = React.useState('');

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

            <View style={mainStyles.inputGroup}>
              <TextInput
                style={mainStyles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={'Username'}
                placeholderTextColor={COLORS.pink}
              />
              <Icon
                name="person-outline"
                type="material-icons"
                size={SIZES.iconSize}
              />
            </View>

            <View style={mainStyles.inputGroup}>
              <TextInput
                style={mainStyles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={'Password'}
                placeholderTextColor={COLORS.pink}
              />
              <Icon name="eye" type="feather" size={SIZES.iconSize} />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAMES.signin)}
              style={mainStyles.actionButton}>
              <View>
                <Text style={mainStyles.buttonText}>Sign in</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAMES.signin)}
              style={mainStyles.actionButton}>
              <View>
                <Text style={mainStyles.buttonText}>Sign up</Text>
              </View>
            </TouchableOpacity>
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
  },
  inputGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: 250,
    height: 30,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightPink,
    paddingHorizontal: SIZES.padding,
  },
  actionButton: {
    alignItems: 'center',
    width: 200,
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

export default Signup;
