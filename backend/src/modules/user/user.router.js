import { Router } from 'express';
import auth from '../../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import * as  controller from './user.controller.js'

const router = Router();

router.delete('/admin/removeUser/:id',auth('admin'),asyncHandler(controller.deleteUserWithPosts))


router.get('/getUserProfile', asyncHandler(controller.getUserProfile));
router.get('/getAllUsers',asyncHandler(controller.getAllUsers));

export default router;

