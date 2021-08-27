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
} from '../actions/index';

import {
  fetchSalonList,
  createNewSalon,
  uploadSalonFeatureImage,
  fetchMySalons,
} from '../../api/salon';

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
  var featureImages = data.featureImages;
  return dispatch => {
    createNewSalon(data)
      .then(async salon => {
        var salonId = salon.id;

        if (featureImages.length > 0) {
          for (var image of featureImages) {
            try {
              const response = await uploadSalonFeatureImage(image, salonId);
              dispatch({
                type: UPLOAD_SALON_IMAGE_SUCCESSFUL,
                payload: response.imageURL,
              });
            } catch (err) {
              console.log(err);
              dispatch({
                type: UPLOAD_SALON_IMAGE_FAILED,
                payload: err,
              });
            }
          }
        }

        dispatch({
          type: CREATE_SALON_SUCCESSFUL,
          payload: salon,
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

const uploadSalonImages = (image, salonId) => {
  return dispatch => {
    uploadSalonFeatureImage(image, salonId)
      .then(response => {
        dispatch({
          type: UPLOAD_SALON_IMAGE_SUCCESSFUL,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: UPLOAD_SALON_IMAGE_FAILED,
          payload: err.response,
        });
      });
  };
};

const fetchMySalonsAction = () => {
  return dispatch => {
    fetchMySalons()
      .then(response => {
        dispatch({
          type: FETCH_MY_SALONS_SUCCESSFUL,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_MY_SALONS_FAILED,
          payload: err,
        });
      });
  };
};

const selectMySalonAtIndex = index => {
  return dispatch => {
    dispatch({
      type: SELECTED_MY_SALON,
      payload: index,
    });
  };
};

export {
  fetchSalonListAction,
  createSalonAction,
  uploadSalonImages,
  fetchMySalonsAction,
  selectMySalonAtIndex,
};
