/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {Icon} from 'react-native-elements';
import {
  Home,
  Search,
  Appointments,
  AppointmentDetail,
  Settings,
  SalonDetail,
  ProductDetail,
  DateTimePicker,
  Worker,
  Signup,
  Signin,
} from './screens/index';
import {COLORS, FONTS, SCREEN_NAMES, NAVIGATOR_NAMES} from './constants/index';

import {Provider} from 'react-redux';
import store from './redux/store';

const NavigationStack = createStackNavigator();

const HomeStackScreen = () => (
  <NavigationStack.Navigator headerMode={'none'}>
    <NavigationStack.Screen name={SCREEN_NAMES.home} component={Home} />
    <NavigationStack.Screen
      name={SCREEN_NAMES.salon}
      component={SalonStackScreen}
    />
  </NavigationStack.Navigator>
);

const SearchStackScreen = () => (
  <NavigationStack.Navigator headerMode={'none'}>
    <NavigationStack.Screen name={SCREEN_NAMES.search} component={Search} />
    <NavigationStack.Screen
      name={SCREEN_NAMES.salon}
      component={SalonStackScreen}
    />
  </NavigationStack.Navigator>
);

const SalonStackScreen = () => (
  <NavigationStack.Navigator headerMode={'none'}>
    <NavigationStack.Screen
      name={SCREEN_NAMES.salonDetail}
      component={SalonDetail}
    />
    <NavigationStack.Screen
      name={SCREEN_NAMES.productDetail}
      component={ProductDetail}
    />
    <NavigationStack.Screen
      name={SCREEN_NAMES.dateTimePicker}
      component={DateTimePicker}
    />
    <NavigationStack.Screen name={SCREEN_NAMES.worker} component={Worker} />
  </NavigationStack.Navigator>
);

const AppointmentStackScreen = () => (
  <NavigationStack.Navigator headerMode={'none'}>
    <NavigationStack.Screen
      name={SCREEN_NAMES.appointment}
      component={Appointments}
    />
    <NavigationStack.Screen
      name={SCREEN_NAMES.appointmentDetail}
      component={AppointmentDetail}
    />
  </NavigationStack.Navigator>
);

const MainNavigator = () => {
  const tabNav = createBottomTabNavigator();
  return (
    <tabNav.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.darkPrimary,
        inactiveTintColor: COLORS.gray,
        labelStyle: FONTS.body5,
      }}>
      <tabNav.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="home" type="font-awesome" color={color} />
          ),
        }}
        component={HomeStackScreen}
      />
      <tabNav.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="search" type="font-awesome" color={color} />
          ),
        }}
      />
      <tabNav.Screen
        name="Appointments"
        component={AppointmentStackScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="calendar" type="font-awesome" color={color} />
          ),
        }}
      />
      <tabNav.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="settings" type="feather" color={color} />
          ),
        }}
      />
    </tabNav.Navigator>
  );
};

const AuthenticationNavigator = () => {
  return (
    <NavigationStack.Navigator headerMode="none">
      <NavigationStack.Screen name={SCREEN_NAMES.signin} component={Signin} />
      <NavigationStack.Screen name={SCREEN_NAMES.signup} component={Signup} />
    </NavigationStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationStack.Navigator headerMode="none">
          <NavigationStack.Screen
            name={NAVIGATOR_NAMES.authentication}
            component={AuthenticationNavigator}
          />
          <NavigationStack.Screen
            name={NAVIGATOR_NAMES.main}
            component={MainNavigator}
          />
        </NavigationStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
