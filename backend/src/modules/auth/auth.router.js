import {Router} from 'express';
import * as AuthController from './auth.controller.js';
import validation from './../../middleware/validation.middleware.js';
import { signinschema, signupschema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema } from './auth.validation.js';
import asyncHandler from 'express-async-handler';

const authRouter = Router();

authRouter.post('/signup',validation(signupschema) ,asyncHandler(AuthController.signup))
authRouter.post('/signin',validation(signinschema) ,asyncHandler(AuthController.signin))

authRouter.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))

authRouter.patch('/forgotPassword', validation(forgotPasswordSchema), asyncHandler(AuthController.forgotPassword));
authRouter.patch('/resetPassword', validation(resetPasswordSchema), asyncHandler(AuthController.resetPassword));
authRouter.patch('/changePassword', validation(changePasswordSchema), asyncHandler(AuthController.changePassword));



export default authRouter ;