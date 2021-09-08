import {showImagePicker} from './imagePicker';

const hourFormat = (hour, minute) => {
  var minuteString = minute.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  if (hour > 12) {
    return `${hour - 12}:${minuteString} PM`;
  } else {
    return `${hour}:${minuteString} AM`;
  }
};

export {hourFormat, showImagePicker};
