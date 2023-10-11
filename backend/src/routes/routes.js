import chatController from "../controller/chatController.js";
import userController from "../controller/userController.js";
import validateUser from "../middlewares/validateUser.js";
import express from 'express';

const router = express.Router();

router.post('/api/user/chat', chatController.processChat);
router.post('/api/user', userController.processPostNewUser);

router.get('/api/user/chats', chatController.processGetChats);

export default router;