import SAVE_CREDENTIALS from '../index';
import {signIn} from '../../../api/authentication';

import {composeWithDevTools} from 'redux-devtools-extension';

const saveCredentials = credentials => {
  return dispatch => {
    signIn(credentials)
      .then(data => {
        console.log(data);
        dispatch({
          type: SAVE_CREDENTIALS,
          payload: data,
        });
      })
      .catch(err => console.error(err));
  };
};

export default saveCredentials;
