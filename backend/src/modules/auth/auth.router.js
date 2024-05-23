import {Router} from 'express';
import * as AuthConroller from './auth.controller.js';
import validation from './../../middleware/validation.middleware.js';
import { signinschema, signupschema } from './auth.validation.js';
import asyncHandler from 'express-async-handler';

const authRouter = Router();

authRouter.post('/signup',validation(signupschema) ,asyncHandler(AuthConroller.signup))
authRouter.post('/signin',validation(signinschema) ,asyncHandler(AuthConroller.signin))

authRouter.patch('/forgotPassword',asyncHandler(AuthConroller.forgotPassword));
authRouter.patch('/resetPassword',asyncHandler(AuthConroller.resetPassword));
authRouter.patch('/changePassword',asyncHandler(AuthConroller.changePassword));

export default authRouter ;