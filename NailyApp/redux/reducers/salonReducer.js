import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
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
          ...state.action,
          type: action.type,
        },
      };
    case FETCH_SALON_DETAIL_SUCCESSFUL:
      return {
        ...state,
        salonDetail: action.payload,
      };
    case FETCH_SALON_DETAIL_FAILED:
      return {
        ...state,
        salonDetail: null,
      };
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
