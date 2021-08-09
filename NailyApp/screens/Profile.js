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

const Profile = ({navigation}) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#560BAD', '#9B65DA', '#4CC9F0']}>
      <SafeAreaView style={mainStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <Text> Profile page </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mainStyles = StyleSheet.create({});

export default Profile;
