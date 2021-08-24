import axios from 'axios';
import apiConfig from '../constants/apiConfig';

const fetchSalonList = () => {
  return axios.get(`${apiConfig.baseUrl}/fetchSalons`).then(response => {
    return response.data;
  });
};

const fetchSalonById = id => {
  const params = {id: id};
  return axios
    .get(`${apiConfig.baseUrl}/fetchSalons`, params)
    .then(response => {
      return response.data;
    });
};

const createNewSalon = data => {
  var formData = new FormData();
  var images = [];

  for (var image of data.featureImages) {
    // images.push({
    //   name: image.fileName,
    //   type: image.type,
    //   uri: image.uri,
    // });
    formData.append('images', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  }

  formData.append('salonName', data.salonName);
  formData.append('phoneNumber', data.phoneNumber);
  formData.append('address', data.address);
  // formData.append('images', JSON.stringify(images));

  console.log(formData);

  return axios
    .post(`${apiConfig.baseUrl}/createSalon`, formData)
    .then(response => response.data);
};

export {fetchSalonList, fetchSalonById, createNewSalon};
