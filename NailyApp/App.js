/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, useColorScheme, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {Home, Search, Reservation, Settings} from './screens/index';
import {COLORS, FONTS, SIZES} from './constants';

const App = () => {
  const tabNav = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <tabNav.Navigator
        tabBarOptions={{
          activeTintColor: COLORS.darkPrimary,
          inactiveTintColor: COLORS.gray,
          labelStyle: FONTS.body5,
          style: {
            height: 80,
          },
        }}>
        <tabNav.Screen
          name="Home"
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="home" type="font-awesome" color={color} />
            ),
          }}
          component={Home}
        />
        <tabNav.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="search" type="font-awesome" color={color} />
            ),
          }}
        />
        <tabNav.Screen
          name="Reservations"
          component={Reservation}
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
