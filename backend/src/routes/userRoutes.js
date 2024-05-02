import express from 'express';
import bcrypt from 'bcryptjs';

import { handleResponse } from '../helpers/util.js';
import { User } from '../models/userModel.js';

const userRouter = express.Router();

// userRouter.get('/', async (req, res) => {
//   // res.send('HELLO, I can see the API request');
//   handleResponse(res, 200, 'thanks for testing');
// });

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
      handleResponse(res, 201, 'Signing up successful', createdUser);
    } else {
      handleResponse(
        res,
        404,
        'This email is already associated with a account'
      );
    }
  } catch (err) {
    handleResponse(res, 404, 'Signing up was not successful');
  }
});

export default userRouter;
