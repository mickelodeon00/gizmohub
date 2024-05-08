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
    process.env.TOKEN_SECRET
  ).toString();

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
  const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_SECRET);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const excludePassword = (user) => {
  const data = user?._doc ? user._doc : user;
  const { password, ...rest } = data;
  return rest;
};
