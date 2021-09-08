import {
  CREATE_PRODUCT_SUCCESSFUL,
  CREATE_PRODUCT_FAILED,
  UPLOAD_PRODUCT_IMAGE_FAILED,
  UPLOAD_PRODUCT_IMAGE_SUCCESSFUL,
} from '../actions/index';

import {createNewProduct, uploadProductImage} from '../../api/product';

const createProductAction = (salonId, data) => {
  var images = data.images;

  return dispatch => {
    createNewProduct(data)
      .then(async productId => {
        if (images.length > 0) {
          for (var image of images) {
            try {
              const response = await uploadProductImage(
                image,
                salonId,
                productId,
              );
              dispatch({
                type: UPLOAD_PRODUCT_IMAGE_SUCCESSFUL,
                payload: response.imageURL,
              });
            } catch (err) {
              dispatch({
                type: UPLOAD_PRODUCT_IMAGE_FAILED,
                payload: err,
              });
            }
          }
        }

        dispatch({
          type: CREATE_PRODUCT_SUCCESSFUL,
          payload: productId,
        });
      })
      .catch(err => {
        dispatch({
          type: CREATE_PRODUCT_FAILED,
          payload: err,
        });
      });
  };
};
