import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import {
  excludePassword,
  generateToken,
  handleResponse,
} from '../helpers/util.js';

const ONE_HOUR = 1000 * 60 * 60;

class UserServices {
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const expiresAt = Date.now() + ONE_HOUR * 24;
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
            generateToken({ ...userData, expiresAt })
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
  }

  static async createUser(req, res) {
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
  }
}

export default UserServices;
