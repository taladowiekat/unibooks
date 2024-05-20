import { Router } from 'express';
import fileUpload, { fileType } from '../../utils/multer.js';
import * as controller from './posts.controller.js';
import auth from '../../middleware/auth.js';
import asyncHandler from 'express-async-handler';
const router = Router();

router.post('/create', auth('user'), fileUpload(fileType.image).array('image', 4), asyncHandler(controller.create));

export default router;