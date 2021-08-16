import axios from 'axios';
import apiConfig from '../constants/apiConfig';

const createProfile = data => {
  return axios
    .post(`${apiConfig.baseUrl}/createProfile`, data)
    .then(response => {
      return response.data;
    });
};

const fetchProfile = _ => {
  return axios.get(`${apiConfig.baseUrl}/fetchProfile`).then(response => {
    return response.data;
  });
};

const updateProfie = data => {
  return axios
    .post(`${apiConfig.baseUrl}/updateProfile`, data)
    .then(response => {
      return response.data;
    });
};

const uploadAvatar = image => {
  const splits = image.uri.split('/');

  const fileName = splits[splits.length - 1];

  var formData = new FormData();
  formData.append('file', {
    name: fileName,
    type: image.type,
    uri: image.uri,
  });

  return axios
    .post(`${apiConfig.baseUrl}/uploadAvatar`, formData)
    .then(response => {
      return response.data;
    });
};

export {createProfile, fetchProfile, updateProfie, uploadAvatar};
