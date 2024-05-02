export const handleResponse = (res, statusCode, message, data, token) =>
  res.status(statusCode).send({
    message,
    data,
    token,
  });
