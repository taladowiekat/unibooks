import { Router } from 'express';
import fileUpload, { fileType } from '../../utils/multer.js';
import * as controller from './posts.controller.js';
import auth from '../../middleware/auth.js';
import asyncHandler from 'express-async-handler';

const router = Router();


router.delete('/remove/:id' ,auth('user'),asyncHandler(controller.deletePost));

router.post('/create', auth('user'), fileUpload(fileType.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
]), asyncHandler(controller.createPost));

router.put('/update/:id', auth('user'), fileUpload(fileType.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 }
]), asyncHandler(controller.updatePost));


export default router;
