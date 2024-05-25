import express from 'express';
import * as userController from './user.controller.js';
import asyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/getUserProfile', asyncHandler(userController.getUserProfile));

export default userRouter;
