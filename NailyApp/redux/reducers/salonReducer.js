import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
  CREATE_SALON_SUCCESSFUL,
  CREATE_SALON_FAILED,
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
      return {
        ...state,
        action: {
          ...state.action,
          errorMessage: action.payload,
        },
      };

    default:
      return state;
  }
};

export default salonReducer;
