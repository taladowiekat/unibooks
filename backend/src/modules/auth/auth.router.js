import {Router} from 'express';
import * as AuthConroller from './auth.controller.js';
import validation from '../../middleware/autj.validation.js';
import { signinschema, signupschema } from './auth.validation.js';
import asyncHandler from 'express-async-handler';

const authRouter = Router();

authRouter.post('/signup',validation(signupschema) ,asyncHandler(AuthConroller.signup))
authRouter.post('/signin',validation(signinschema) ,asyncHandler(AuthConroller.signin))

export default authRouter ; 