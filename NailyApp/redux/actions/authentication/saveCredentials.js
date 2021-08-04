import SAVE_CREDENTIALS from '../index';
import {signIn} from '../../../api/authentication';

const saveCredentials = credentials => {
  return dispatch => {
    signIn(credentials)
      .then(data => {
        dispatch({
          type: SAVE_CREDENTIALS,
          payload: data,
        });
      })
      .catch(err => console.error(err));
  };
};

export default saveCredentials;
