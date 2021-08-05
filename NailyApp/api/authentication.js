import axios from 'axios';
import apiConfig from '../constants/apiConfig';

const signIn = data => {
  return axios.post(`${apiConfig.baseUrl}/signIn`, data).then(response => {
    return response.data;
  });
};

const signUp = data => {
  return axios.post(`${apiConfig.baseUrl}/signUp`, data).then(response => {
    return response.data;
  });
};

export {signIn, signUp};
