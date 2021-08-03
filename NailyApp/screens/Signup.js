import React, {useState} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, SCREEN_NAMES} from '../constants/index';
import {Icon} from 'react-native-elements';
import {styles} from '../styles/index';

const Signup = ({navigation}) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#560BAD', '#9B65DA', '#4CC9F0']}>
      <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.centeredGroup}>
          <Text style={mainStyles.nailyLogo}>Naily</Text>
          <Text>Sign up Page</Text>
          <TouchableOpacity
            style={{backgroundColor: COLORS.primary}}
            onPress={() => navigation.navigate(SCREEN_NAMES.signin)}>
            <View>
              <Text>Go To Sign in</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  nailyLogo: {
    ...FONTS.bigNaily,
    color: COLORS.pink,
  },
  centeredGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
