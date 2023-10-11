import chatController from "../controller/chatController.js"
import validateUser from "../middlewares/validateUser.js";
import express from 'express';

const router = express.Router();

router.post('/api/user/chat/save', chatController.processSaveChat);
router.post('/api/user/summary/save', chatController.processSaveSummary);
router.post('/api/user/summary', chatController.processSummary);
router.post('/api/user/suggestions', chatController.processSuggestion);

export default router;