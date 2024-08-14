import express from 'express';
import {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser
} from '../controller/userController.js';

const userrouter = express.Router();

userrouter.post('/createuser', createUser);
userrouter.get('/getuser', getUsers);
userrouter.get('/getuser/:id', getOneUser);
userrouter.put('/update/:id', updateUser);
userrouter.delete('/deleteuser/:id', deleteUser);

export default userrouter;
