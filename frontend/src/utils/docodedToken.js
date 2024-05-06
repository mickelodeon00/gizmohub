// import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export const decodedToken = (token) => {
  if (!token) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(token, 'wealth123456');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
};
