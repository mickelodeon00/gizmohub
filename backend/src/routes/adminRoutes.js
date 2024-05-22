import express from 'express';
import AuthCheck from '../helpers/middleware.js';
import AdminServices from '../services/adminServices.js';

const adminRouter = express.Router();

// adminRouter.post(
//   '/signin',
//   // AuthCheck.checkAuthStatus,
//   // AuthCheck.checkToken,
//   UserServices.loginUser
// );
// adminRouter.post('/signup', UserServices.createUser);

adminRouter.get('/get-all-users', AdminServices.getAllUsers);
adminRouter.post('/update-user', AdminServices.updateUser);

export default adminRouter;
