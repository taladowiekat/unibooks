import { Router } from 'express';
import * as controller from './user.controller.js';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/getAllUsers',asyncHandler(controller.getAllUsers));


export default router;