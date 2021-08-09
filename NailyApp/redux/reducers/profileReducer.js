import {
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_CREATED_FAILED,
  PROFILE_FETCHED,
  PROFILE_EMPTY,
  CLEAR_PROFILE,
} from '../actions/index';

const initialState = {
  profile: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    username: null,
    avatarUrl: null,
  },
  action: {
    type: null,
    errorMesasge: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED:
    case PROFILE_CREATED_SUCCESSFUL:
      return {
        ...state,
        action: {
          errorMesasge: null,
          type: action.type,
        },
        profile: {
          firstName: action.payload.firstname,
          lastName: action.payload.lastname,
          phoneNumber: action.payload.phonenumber,
          avatarUrl: action.payload.avatarUrl,
          username: action.payload.username,
        },
      };
    case PROFILE_EMPTY:
      return {
        ...state,
        action: {
          ...state.action,
          type: action.type,
        },
        profile: {
          firstName: null,
          lastName: null,
          phoneNumber: null,
          avatarUrl: null,
          username: null,
        },
      };
    case PROFILE_CREATED_FAILED:
      return {
        ...state,
        action: {
          type: action.type,
          errorMessage: action.payload,
        },
        profile: {
          firstname: null,
          lastname: null,
          phonenumber: null,
          avatarUrl: null,
          username: null,
        },
      };
    case CLEAR_PROFILE:
      return initialState;

    default:
      return state;
  }
};

export default profileReducer;
