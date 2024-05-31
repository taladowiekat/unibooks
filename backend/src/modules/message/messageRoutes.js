import express from 'express';
import { saveMessage, getMessage } from './messageController.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/save-message', asyncHandler(saveMessage));
router.get('/message/:messageId', asyncHandler(getMessage));

export default router;
