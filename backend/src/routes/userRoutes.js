import express from 'express';
import AuthCheck from '../helpers/middleware.js';
import UserServices from '../services/userServices.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  // AuthCheck.checkAuthStatus,
  // AuthCheck.checkToken,
  UserServices.loginUser
);
userRouter.post('/signup', UserServices.createUser);

export default userRouter;
