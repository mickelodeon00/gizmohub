import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import {
  excludePassword,
  generateToken,
  handleResponse,
} from '../helpers/util.js';
import { ROLE } from '../constants.js';

// const ONE_HOUR = 1000 * 60 * 60;

class AdminServices {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      console.log('users datajjjjj');
      handleResponse(res, 200, 'users found', users);
    } catch (err) {
      handleResponse(res, 401, 'Unable to find users data');
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        handleResponse(res, 401, 'Selected user not found');
      }
      // if (req.body.role) {
      //   if (!Object.values(ROLE).include(req.body.role)) {
      //     handleResponse(res, 401, 'Invalid role selection');
      //   }
      // }
      console.log('user22', user);
      const info = {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        role: req.body.role || user.role,
        isPremiumVendor: req.body.isPremiumVendor || user.isPremiumVendor,
      };
      console.log('info000', info);
      const update = await User.updateOne({ _id: req.body.id }, { $set: info });
      // console.log('update66666666', update);
      handleResponse(res, 200, 'User Info updated successfully', update);
    } catch (err) {
      handleResponse(res, 401, 'Unable to update user data');
    }
  }
}

export default AdminServices;
