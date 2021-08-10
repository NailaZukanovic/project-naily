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

export {fetchSalonList, fetchSalonById};
