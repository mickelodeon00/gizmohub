import axios from 'axios';

export const getRequest = async ({ url }) => {
  const response = await axios.get(url);
  return response?.data || response;
};

export const postRequest = async ({ url, data }) => {
  const response = await axios.post(url, data);
  return response?.data || response;
};

export const putRequest = async ({ url, data }) => {
  const response = await axios.put(url, data);
  return response?.data || response;
};

export const patchRequest = async ({ url, data }) => {
  const response = await axios.patch(url, data);
  return response?.data || response;
};

export const deleteRequest = async ({ url, data }) => {
  const response = await axios.delete(url, data);
  return response?.data || response;
};
