import chatController from "../controller/chatController.js";
import userController from "../controller/userController.js";
import validateUser from "../middlewares/validateUser.js";
import sessionController from "../controller/sessionController.js";
import express from 'express';

const router = express.Router();

router.post('/api/user/:sessionId/chat', validateUser.validateToken, chatController.processSaveChat);
router.post('/api/user/:sessionId/chat/ai', validateUser.validateToken, chatController.processChat);
router.post('/api/user/sessions', validateUser.validateToken, sessionController.processSaveSession);
router.post('/api/user', userController.processPostNewUser);

router.get('/api/user', validateUser.validateToken, userController.getUserData);
router.get('/api/user/sessions', validateUser.validateToken, sessionController.processGetSessions)
router.get('/api/user/:sessionId/chats', validateUser.validateToken, chatController.processGetChats);

export default router;