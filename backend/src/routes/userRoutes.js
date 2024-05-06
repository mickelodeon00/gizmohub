import express from 'express';
import bcrypt from 'bcryptjs';

import {
  generateToken,
  handleResponse,
  excludePassword,
} from '../helpers/util.js';
import { User } from '../models/userModel.js';

const userRouter = express.Router();

// userRouter.get('/', async (req, res) => {
//   // res.send('HELLO, I can see the API request');
//   handleResponse(res, 200, 'thanks for testing');
// });

userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const userData = excludePassword(user);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        handleResponse(
          res,
          200,
          'Login successful',
          userData,
          generateToken(userData)
        );
      } else {
        handleResponse(res, 400, 'Invalid email or password');
      }
    } else {
      handleResponse(res, 400, 'Invalid email or password 1');
    }
  } catch (err) {
    handleResponse(res, 400, 'Login not successful');
  }
});

userRouter.post('/signup', async (req, res) => {
  const { name, email, password, image, role } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User({
        ...req.body,
        password: bcrypt.hashSync(password),
      });

      const createdUser = await newUser.save();
      const userData = excludePassword(createdUser);
      handleResponse(
        res,
        201,
        'Signing up successful',
        userData,
        generateToken(userData)
      );
    } else {
      handleResponse(
        res,
        404,
        'This email is already associated with an account'
      );
    }
  } catch (err) {
    handleResponse(res, 404, 'Signing up was not successful');
  }
});

export default userRouter;
