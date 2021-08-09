import {
  PROFILE_FETCHED,
  //   PROFILE_CREATED_SUCCESSFUL,
  //   PROFILE_CREATED_FAILED,
  PROFILE_EMPTY,
} from './index';
import {fetchProfile} from '../../api/profile';

const fetchProfileAction = _ => {
  return dispatch => {
    fetchProfile()
      .then(data => {
        dispatch({
          type: PROFILE_FETCHED,
          payload: data,
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          dispatch({
            type: PROFILE_EMPTY,
            payload: null,
          });
        }
      });
  };
};

export {fetchProfileAction};
