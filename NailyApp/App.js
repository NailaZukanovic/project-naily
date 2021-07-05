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
import Home from './screens/index';
import {COLORS} from './constants';

const App = () => {
  const FindScreen = () => (
    <View>
      <Text>Home Screen here</Text>
    </View>
  );

  const tabNav = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <tabNav.Navigator
        screenOptions={{}}
        tabBarOptions={{
          activeTintColor: COLORS.darkPrimary,
          inactiveTintColor: COLORS.primary,
        }}>
        <tabNav.Screen
          name="Home"
          options={{
            tabBarIcon: ({focused}) => (
              <Icon name="home" type="font-awesome" color={COLORS.primary} />
            ),
          }}
          component={Home}
        />
        <tabNav.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon name="search" type="font-awesome" color={COLORS.primary} />
            ),
          }}
        />
        <tabNav.Screen
          name="Reservation"
          component={FindScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="calendar"
                type="font-awesome"
                color={COLORS.primary}
              />
            ),
          }}
        />
        <tabNav.Screen
          name="Settings"
          component={FindScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon name="settings" type="feather" color={COLORS.primary} />
            ),
          }}
        />
      </tabNav.Navigator>
    </NavigationContainer>
  );
};

export default App;
