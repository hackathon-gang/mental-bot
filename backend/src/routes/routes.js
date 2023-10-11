import chatController from "../controller/chatController.js";
import userController from "../controller/userController.js";
import validateUser from "../middlewares/validateUser.js";
import sessionController from "../controller/sessionController.js";
import express from 'express';

const router = express.Router();

router.post('/api/user/:userId/:sessionId/chat', chatController.processChat);
router.get('/api/user/:userId/sessions', sessionController.processGetSessions)
router.get('/api/user/:userId/:sessionId/chats', chatController.processGetChats);
router.post('/api/user/:userId/sessions', sessionController.processSaveSession);
router.get('/api/user/:userId', userController.getUserData);
router.post('/api/user', userController.processPostNewUser);


export default router;