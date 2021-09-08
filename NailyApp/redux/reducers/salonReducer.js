import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_MY_SALONS_SUCCESSFUL,
  FETCH_MY_SALONS_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
  CREATE_SALON_SUCCESSFUL,
  CREATE_SALON_FAILED,
  UPLOAD_SALON_IMAGE_SUCCESSFUL,
  UPLOAD_SALON_IMAGE_FAILED,
  SELECTED_MY_SALON,
  CREATE_PRODUCT_SUCCESSFUL,
  CREATE_PRODUCT_FAILED,
  UPLOAD_PRODUCT_IMAGE_SUCCESSFUL,
  UPLOAD_PRODUCT_IMAGE_FAILED,
} from '../actions/index';

const initialState = {
  salons: [],
  salonDetail: {},
  mySalons: [],
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
    case CREATE_PRODUCT_SUCCESSFUL:
    case UPLOAD_PRODUCT_IMAGE_SUCCESSFUL:
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
    case FETCH_MY_SALONS_SUCCESSFUL:
      return {
        ...state,
        mySalons: action.payload,
        action: {
          type: action.type,
          errorMessage: null,
        },
      };
    case CREATE_SALON_FAILED:
    case FETCH_SALONS_FAILED:
    case UPLOAD_SALON_IMAGE_FAILED:
    case FETCH_MY_SALONS_FAILED:
    case UPLOAD_PRODUCT_IMAGE_FAILED:
      return {
        ...state,
        action: {
          type: action.type,
          errorMessage: action.payload,
        },
      };

    case SELECTED_MY_SALON:
      if (state.mySalons.length < 0) {
        return {
          ...state,
          action: {
            type: action.type,
            errorMessage: 'My salon is empty',
          },
        };
      } else {
        return {
          ...state,
          salonDetail: {...state.mySalons[action.payload], isOwner: true},
          action: {
            type: action.type,
            errorMessage: null,
          },
        };
      }

    default:
      return state;
  }
};

export default salonReducer;
