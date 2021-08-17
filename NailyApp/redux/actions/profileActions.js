import {
  PROFILE_FETCHED,
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_CREATED_FAILED,
  PROFILE_EMPTY,
  CLEAR_PROFILE,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESSFUL,
  UPLOAD_AVATAR_SUCCESSFUL,
  UPLOAD_AVATAR_FAILED,
} from './index';
import {
  createProfile,
  fetchProfile,
  updateProfie,
  uploadAvatar,
} from '../../api/profile';

const fetchProfileAction = _ => {
  return dispatch => {
    fetchProfile()
      .then(data => {
        console.log(data);
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

const clearProfileAction = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROFILE,
    });
  };
};

const updateProfileAction = formData => {
  return dispatch => {
    updateProfie(formData)
      .then(data => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          dispatch({
            type: UPDATE_PROFILE_FAILED,
          });
        }
      });
  };
};

const uploadAvatarAction = image => {
  return dispatch => {
    uploadAvatar(image)
      .then(data => {
        console.log(data);
        dispatch({
          type: UPLOAD_AVATAR_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
        switch (err.response.status) {
          case 403:
            dispatch({
              type: UPLOAD_AVATAR_FAILED,
              payload: err,
            });
            return;
          case 500:
          default:
            dispatch({
              type: UPLOAD_AVATAR_FAILED,
              payload: err,
            });
            return;
        }
      });
  };
};

export {
  fetchProfileAction,
  createProfileAction,
  clearProfileAction,
  updateProfileAction,
  uploadAvatarAction,
};
