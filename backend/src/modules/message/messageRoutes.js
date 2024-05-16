import express from 'express';
import  {saveMessage}  from './messageController.js';


const router = express.Router();

router.post('/save-message', saveMessage);

export default router;
