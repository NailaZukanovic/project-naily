import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
  CREATE_SALON_SUCCESSFUL,
  CREATE_SALON_FAILED,
  UPLOAD_SALON_IMAGE_SUCCESSFUL,
  UPLOAD_SALON_IMAGE_FAILED,
} from '../actions/index';

const initialState = {
  salons: [],
  salonDetail: {},
  salonCount: 0,
  action: {
    type: null,
    errorMessage: null,
  },
};

const salonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALONS_SUCCESSFUL:
      return {
        ...state,
        salons: action.payload.data,
        salonCount: action.payload.count,
        action: {
          errorMessage: null,
          type: action.type,
        },
      };
    case FETCH_SALON_DETAIL_SUCCESSFUL:
      return {
        ...state,
        salonDetail: action.payload,
      };
    case CREATE_SALON_SUCCESSFUL:
    case UPLOAD_SALON_IMAGE_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: action.type,
          errorMessage: null,
        },
      };
    case FETCH_SALON_DETAIL_FAILED:
      return {
        ...state,
        salonDetail: null,
      };
    case CREATE_SALON_FAILED:
    case FETCH_SALONS_FAILED:
    case UPLOAD_SALON_IMAGE_FAILED:
      return {
        ...state,
        action: {
          type: action.type,
          errorMessage: action.payload,
        },
      };

    default:
      return state;
  }
};

export default salonReducer;
