import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export const handleResponse = (res, statusCode, message, data, token) =>
  res.status(statusCode).send({
    message,
    data,
    token,
  });

export const generateToken = (payload) => {
  const token = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    'wealth123456'
  ).toString();
  // console.log('token', token);
  try {
    const data = decodeToken(token);
    const check = decodeToken(token);
    // console.log('data,', data);
  } catch (err) {
    console.log('ERRRRRR', err);
  }

  return token;
  // return jwt.sign(
  //   {
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     image: user.image,
  //   },
  //   process.env.JWT_SECRET,
  //   { expiresIn: '10d' }
  // );
};

export const decodeToken = (token) => {
  const bytes = CryptoJS.AES.decrypt(token, 'wealth123456');
  console.log('token', token);
  console.log(bytes);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const excludePassword = (user) => {
  const data = user?._doc ? user._doc : user;
  const { password, ...rest } = data;
  return rest;
};
