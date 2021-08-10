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

export {createProfile, fetchProfile, updateProfie};
