// import axios from 'axios';
import baseAxiosMethod from './baseAxiosMethod';

export const getRequest = async ({ url }) => {
  const response = await baseAxiosMethod.get(url);
  return response?.data || response;
};

export const postRequest = async ({ url, data }) => {
  const response = await baseAxiosMethod.post(url, data);
  return response?.data || response;
};

export const putRequest = async ({ url, data }) => {
  const response = await baseAxiosMethod.put(url, data);
  return response?.data || response;
};

export const patchRequest = async ({ url, data }) => {
  const response = await baseAxiosMethod.patch(url, data);
  return response?.data || response;
};

export const deleteRequest = async ({ url, data }) => {
  const response = await baseAxiosMethod.delete(url, data);
  return response?.data || response;
};
