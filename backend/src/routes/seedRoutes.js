import express from 'express';
import data from '../data.js';
import { User } from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await User.deleteMany({});
  const createUsers = await User.insertMany(data.users);
  console.log('createUsers', createUsers);
  res.send(createUsers);
});

export default seedRouter;
