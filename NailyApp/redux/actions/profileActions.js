import {
  PROFILE_FETCHED,
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_CREATED_FAILED,
  PROFILE_EMPTY,
  CLEAR_PROFILE,
} from './index';
import {createProfile, fetchProfile} from '../../api/profile';

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

const createProfileAction = formData => {
  return dispatch => {
    console.log('here');
    createProfile(formData)
      .then(res => {
        dispatch({
          type: PROFILE_CREATED_SUCCESSFUL,
          payload: res,
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          dispatch({
            type: PROFILE_CREATED_FAILED,
            payload: err.response.data.message,
          });
        }
      });
  };
};

const clearProfile = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROFILE,
    });
  };
};

export {fetchProfileAction, createProfileAction, clearProfile};
