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
  const newSalon = {
    salonName: data.salonName,
    phoneNumber: data.phoneNumber,
    address: data.address,
    openHours: data.openHours,
  };

  return axios
    .post(`${apiConfig.baseUrl}/createSalon`, newSalon)
    .then(response => response.data.salonId);
};

const uploadSalonFeatureImage = (image, salonId) => {
  const formData = new FormData();

  formData.append('image', {
    name: image.fileName,
    type: image.type,
    uri: image.uri,
  });

  formData.append('salonId', salonId);

  return axios
    .post(`${apiConfig.baseUrl}/uploadSalonImage`, formData)
    .then(response => {
      return response.data;
    });
};

const fetchMySalons = () => {
  return axios
    .get(`${apiConfig.baseUrl}/fetchMySalons`)
    .then(response => response);
};

export {
  fetchSalonList,
  fetchSalonById,
  createNewSalon,
  uploadSalonFeatureImage,
  fetchMySalons,
};
