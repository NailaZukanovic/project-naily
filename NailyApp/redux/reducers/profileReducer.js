import {
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_CREATED_FAILED,
  PROFILE_FETCHED,
  PROFILE_EMPTY,
  CLEAR_PROFILE,
  UPDATE_PROFILE_SUCCESSFUL,
  UPDATE_PROFILE_FAILED,
  UPLOAD_AVATAR_SUCCESSFUL,
  UPLOAD_AVATAR_FAILED,
  SERVER_ERROR,
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
    message: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCHED:
    case PROFILE_CREATED_SUCCESSFUL:
    case UPDATE_PROFILE_SUCCESSFUL:
      return {
        ...state,
        action: {
          message: null,
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
          message: action.payload,
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

    case UPDATE_PROFILE_FAILED:
      state.action.type = action.type;
      return state;

    case UPLOAD_AVATAR_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: action.type,
          message: 'Uploaded avatar succesfullly',
        },
      };

    case UPLOAD_AVATAR_FAILED:
      return {
        ...state,
        action: {
          type: action.type,
          message: 'Failed to upload avatar',
        },
      };

    case SERVER_ERROR:
      return {
        ...state,
        action: {
          type: action.type,
          message: 'Server error, please check log',
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
