import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';

const showImagePicker = (options, callback) => {
  Alert.alert('Add a new image', 'Pick a method', [
    {
      text: 'Take a picture',
      onPress: () => launchCamera(options, callback),
      style: 'cancel',
    },
    {
      text: 'Open gallery',
      onPress: () => launchImageLibrary(options, callback),
      style: 'cancel',
    },
    {
      text: 'Cancel',
      style: 'cancel',
    },
  ]);
};

export {showImagePicker};
