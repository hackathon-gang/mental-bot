import chatController from "../controller/chatController.js"
import validateUser from "../middlewares/validateUser.js";
import express from 'express';

const router = express.Router();

router.post('/api/user/chat', chatController.processChat);

export default router;