import {
  SIGN_IN_SUCCESSFUL,
  SIGN_IN_FAILED,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_OUT,
  AUTH_SERVER_ERROR,
} from './index';
import {signIn, signUp, signOut} from '../../api/authentication';

const signInAction = credentials => {
  return dispatch => {
    signIn(credentials)
      .then(data => {
        dispatch({
          type: SIGN_IN_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
        switch (err.response.status) {
          case 403:
            dispatch({
              type: SIGN_IN_FAILED,
              payload: err.response.message,
            });
            return;
          default:
            dispatch({
              type: AUTH_SERVER_ERROR,
              payload: err.response.message,
            });
            return;
        }
      });
  };
};

const signUpAction = validatedData => {
  return dispatch => {
    signUp(validatedData)
      .then(data => {
        dispatch({
          type: SIGN_UP_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        dispatch({
          type: SIGN_UP_FAILED,
          payload: err,
        });
      });
  };
};

const signOutAction = () => {
  return dispatch => {
    signOut()
      .then(_ => {
        dispatch({
          type: SIGN_OUT,
          payload: null,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export {signInAction, signUpAction, signOutAction};
