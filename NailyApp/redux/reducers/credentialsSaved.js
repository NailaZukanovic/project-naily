import SAVE_CREDENTIALS from '../actions/index';

const initialState = {
  credentials: {
    email: null,
    password: null,
    token: null,
  },
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return {...state, credentials: action.payload};
    default:
      return state;
  }
};

export default authenticationReducer;
