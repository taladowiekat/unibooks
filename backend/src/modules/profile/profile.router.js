import { Router } from 'express';
import * as ProfileController from './profile.controller.js';
import asyncHandler from 'express-async-handler';
import validation from './../../middleware/validation.middleware.js';
import { profileSchema } from './profile.validation.js';
import fileUpload, { fileType } from '../../utils/multer.js';


const profileRouter = Router();


profileRouter.patch('/updateProfile',validation(profileSchema) ,fileUpload(fileType.image).single('profilePicture'), asyncHandler(ProfileController.updateProfile));

export default profileRouter;
