import express from 'express';
import * as userController from './user.controller.js';

const userRouter = express.Router();

userRouter.get('/getUserProfile', userController.getUserProfile);

export default userRouter;
