import chatService from "../services/chatServices.js";

const chatController = {

    processSaveChat: async (req, res, next) => {
        let chatText = req.body.chatText;
        let sessionId = req.body.sessionId;
        let byUser = req.body.byUser;
        try {
            const savedChatData = await chatService.saveChat(
                sessionId,
                chatText,
                byUser
            );
            console.log(savedChatData);
            return res.status(200).json({
                statusCode: 200,
                ok: true,
                message: 'Save chat successful',
            });
        } catch (error) {
            console.error(error.code);
            console.error('Error in saveChat: ', error);
            return next(error);
        }

    },

    processSummary: async (req, res, next) => {
        let chatText = req.body.chatText;

        chatService.summarizeChat(chatText, (err, data) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            else {
                summarizedText = data;
                res.status(200).json({ message: data });
            }
        })
    },

    processSaveSummary: async (req, res, next) => {
        let messageId = req.body.messageId;
        let summarizedText = req.body.summarizedText;
        try {
            const savedSummaryData = await chatService.saveSummary(
                messageId,
                summarizedText
            );
            console.log(savedSummaryData);
            return res.status(200).json({
                statusCode: 200,
                ok: true,
                message: 'Save summary successful',
            });
        } catch (error) {
            console.error(error.code);
            console.error('Error in saveSummary: ', error);
            return next(error);
        }

    },

    processSuggestion: (req, res, next) => {
        let summarizedText = req.body.summarizedText;

        chatService.giveSuggestions(summarizedText, (err, data) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            else {
                res.status(200).json({ message: data });
            }
        })
    },
};

export default chatController;