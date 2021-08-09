import {
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_CREATED_FAILED,
  PROFILE_FETCHED,
  PROFILE_EMPTY,
} from '../actions/index';

const initialState = {
  profile: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    avatarUrl: null,
  },
  action: {
    type: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED:
      return {
        ...state,
        action: {
          type: action.type,
        },
        profile: {
          firstName: action.payload.firstname,
          lastName: action.payload.lastname,
          phoneNumber: action.payload.phonenumber,
          avatarUrl: action.payload.avatarUrl,
        },
      };
    case PROFILE_EMPTY:
      return {
        ...state,
        action: {
          type: action.type,
        },
        profile: {
          firstName: null,
          lastName: null,
          phoneNumber: null,
          avatarUrl: null,
        },
      };
    case PROFILE_CREATED_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: action.type,
        },
        profile: {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          phonenumber: action.payload.phonenumber,
          avatarUrl: action.payload.avatarUrl,
        },
      };
    case PROFILE_CREATED_FAILED:
      return {
        ...state,
        action: {
          type: action.type,
        },
        profile: {
          firstname: null,
          lastname: null,
          phonenumber: null,
          avatarUrl: null,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
