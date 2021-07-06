import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';
import {
  styles,
  searchStyles,
  reservationStyles,
  settingsStyles,
} from '../styles/index';

import {discoverySalons, reservationData} from '../dummy/index';
import ScreenHeader from '../components/ScreenHeader';

const Settings = () => {
  return (
    <View style={styles.fullContainer}>
      <SafeAreaView>
        <ScreenHeader title={'Settings'} />
        <ScrollView
          style={{width: '100%', height: '100%', ...settingsStyles.container}}>
          <View>
            <Text style={{...FONTS.h2}}>General</Text>
            <View style={settingsStyles.itemContainer}>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Profile</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Payment settings</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Notifications</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Privacy & data</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Account</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{...FONTS.h2}}>Worker Settings</Text>
            <View style={settingsStyles.itemContainer}>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Profile</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{...FONTS.h2}}>Manager Settings</Text>
            <View style={settingsStyles.itemContainer}>
              <TouchableOpacity style={settingsStyles.item}>
                <Text style={{...FONTS.body2}}> Salon Management</Text>
                <Icon name="right" type="ant-design" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{...FONTS.h2}}>About</Text>
            <View style={settingsStyles.itemContainer}>
              <TouchableOpacity>
                <Text style={{...FONTS.body2}}> Version 1.23.4</Text>
                <Text style={{...FONTS.body2}}> Last updated Feb 23, 2021</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Settings;
