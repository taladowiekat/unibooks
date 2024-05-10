import {Router} from 'express';
import * as AuthConroller from './auth.controller.js';
import validation from '../../middleware/autj.validation.js';
import { signinschema, signupschema } from './auth.validation.js';

const router = Router();

router.post('/signup',validation(signupschema) ,asyncHandler(AuthConroller.signup))

router.post('/signin',validation(signinschema) ,asyncHandler(AuthConroller.login))

//router.get('/confirmEmail/:token',asyncHandler(AuthConroller.confirmEmail))

export default router ; 