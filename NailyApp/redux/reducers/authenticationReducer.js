import {
  SIGN_IN_SUCCESSFUL,
  SIGN_IN_FAILED,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_OUT,
} from '../actions/index';

const initialState = {
  auth: {
    token: null,
    timeStamp: null,
    message: null,
  },
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        auth: {
          token: action.payload.token,
          timeStamp: new Date().toISOString(),
          message: 'Signed in succesful',
        },
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        auth: {
          token: null,
          timeStamp: null,
          message: 'Wrong username or password',
        },
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        auth: {
          token: action.payload.token,
          timeStamp: new Date().toISOString(),
          message: 'Signed up successful',
        },
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        auth: {
          token: null,
          timeStamp: null,
          message: 'Unable to sign up for an account',
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        auth: {
          token: null,
          timeStamp: null,
          message: null,
        },
      };
    default:
      return state;
  }
};

export default authenticationReducer;
