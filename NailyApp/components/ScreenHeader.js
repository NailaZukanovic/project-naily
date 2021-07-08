import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {FONTS} from '../constants/index';
import {Icon} from 'react-native-elements';

const ScreenHeader = props => {
  let backArrowButton = props.shownBackArrow ? (
    <TouchableOpacity
      style={styles.button}
      // onPress={() => props.navigation.goBack()}>
      onPress={props.onPressLeftButton}>
      <Icon name="arrow-left" type="font-awesome" />
    </TouchableOpacity>
  ) : (
    <View style={styles.button} />
  );

  let optionButton = props.optionButton ? (
    <TouchableOpacity style={styles.button} onPress={props.rightButtonOnPress}>
      {props.optionButtonIcon}
    </TouchableOpacity>
  ) : (
    <View style={styles.button} />
  );

  return (
    <View style={styles.container}>
      {backArrowButton}
      <Text style={styles.title}>{props.title}</Text>
      {optionButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h1,
    flex: 1,
    textAlign: 'center',
  },
});

export default ScreenHeader;
