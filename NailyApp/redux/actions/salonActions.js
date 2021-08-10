import {
  FETCH_SALON_DETAIL_SUCCESSFUL,
  FETCH_SALON_DETAIL_FAILED,
  FETCH_SALONS_SUCCESSFUL,
  FETCH_SALONS_FAILED,
} from '../actions/index';

import {fetchSalonList, fetchSalonById} from '../../api/salon';

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

export {fetchSalonListAction};
