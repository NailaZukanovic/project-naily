import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
  CREATE_SALON_SUCCESSFUL,
  CREATE_SALON_FAILED,
} from '../actions/index';

import {fetchSalonList, createNewSalon} from '../../api/salon';

const fetchSalonListAction = _ => {
  return dispatch => {
    fetchSalonList()
      .then(data => {
        dispatch({
          type: FETCH_SALONS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          dispatch({
            type: FETCH_SALONS_FAILED,
          });
        }
      });
  };
};

const createSalonAction = data => {
  return dispatch => {
    createNewSalon(data)
      .then(response => {
        dispatch({
          type: CREATE_SALON_SUCCESSFUL,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: CREATE_SALON_FAILED,
          payload: err,
        });
      });
  };
};

export {fetchSalonListAction, createSalonAction};
