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
  Settings,
  SalonDetail,
  ProductDetail,
  DateTimePicker,
  Worker,
} from './screens/index';
import {COLORS, FONTS, SCREEN_NAMES} from './constants/index';

const SearchStack = createStackNavigator();
const HomeStackScreen = () => (
  <SearchStack.Navigator headerMode={'none'}>
    <SearchStack.Screen name={SCREEN_NAMES.home} component={Home} />
    <SearchStack.Screen
      name={SCREEN_NAMES.salon}
      component={SalonStackScreen}
    />
  </SearchStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator headerMode={'none'}>
    <SearchStack.Screen name={SCREEN_NAMES.search} component={Search} />
    <SearchStack.Screen
      name={SCREEN_NAMES.salon}
      component={SalonStackScreen}
    />
  </SearchStack.Navigator>
);

const SalonStackScreen = () => (
  <SearchStack.Navigator headerMode={'none'}>
    <SearchStack.Screen
      name={SCREEN_NAMES.salonDetail}
      component={SalonDetail}
    />
    <SearchStack.Screen
      name={SCREEN_NAMES.productDetail}
      component={ProductDetail}
    />
    <SearchStack.Screen
      name={SCREEN_NAMES.dateTimePicker}
      component={DateTimePicker}
    />
    <SearchStack.Screen name={SCREEN_NAMES.worker} component={Worker} />
  </SearchStack.Navigator>
);

const App = () => {
  const tabNav = createBottomTabNavigator();

  return (
    <NavigationContainer>
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
          component={Appointments}
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
    </NavigationContainer>
  );
};

export default App;
