import axios from 'axios';
import apiConfig from '../constants/apiConfig';

const createNewProduct = data => {
  const newProduct = {
    name: data.name,
    duration: data.duration,
    description: data.description,
  };

  return axios
    .post(`${apiConfig.baseUrl}/createProduct`, newProduct)
    .then(response => response.data.id);
};

const uploadProductImage = (image, salonId, productId) => {
  const formData = formData();

  formData.append('image', {
    name: image.fileName,
    type: image.type,
    uri: image.uri,
  });

  formData.append('salonId', salonId);
  formData.append('productId', productId);

  return axios
    .post(`${apiConfig.baseUrl}/uploadProductImage`, formData)
    .then(response => {
      return response.data;
    });
};

export {createNewProduct, uploadProductImage};
