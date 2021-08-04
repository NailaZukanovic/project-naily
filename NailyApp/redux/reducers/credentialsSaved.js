import SAVE_CREDENTIALS from '../actions/index';

const initialState = {
  credentials: {
    email: null,
    password: null,
    token: null,
  },
};

const authenticationReducer = (state = initialState, action) => {
  console.log('action payload ', action.payload);
  console.log('action type', action.type);
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return {...state, credentials: action.payload};
    default:
      return state;
  }
};

export default authenticationReducer;
