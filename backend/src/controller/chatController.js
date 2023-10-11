import chatService from "../services/chatServices.js";
import cbtService from "../services/cbtServices.js";

const chatController = {

    processChat: async (req, res, next) => {
        let chatText = req.body.chatText;
        let uid = req.body.uid;
        let sid = req.body.sid;

        try {
            const messageId = await chatService.saveChat(sid, chatText, 1);
            const summaryText = await chatService.summarizeChat(chatText);
            const suggestionText = await chatService.giveSuggestions(summaryText);
            const suggestionResult = await chatService.saveChat(sid, suggestionText, 0);
            const summarySaveResult = await chatService.saveSummary(messageId, summaryText);
            const questionData = await cbtService.getCBTQuestions();

            let questions = "";
            let questionArr = [];
            questionData.forEach(item => {
                questions += "\n" + item.qid + "." + item.question;
                questionArr.push(item.qid);
            })
            console.log(questions);

            const cbtResult = await chatService.generateCBTAnswers(chatText, questions);
            let answerArr = cbtResult.split("\n");
            answerArr = answerArr.map((text) => {
                return text.replace(/^\d+\.\s*/, '');
            })
            console.log(answerArr);

            const cbtSaveResult = await cbtService.saveCBTResult(questionArr, answerArr, messageId, sid);

            return res.status(200).json({
                statusCode: 200,
                ok: true,
                message: 'success'
            });
        }
        catch(error) {
            console.error('Error in processChat: ', error);
            return next(error);
        }
    }
};

export default chatController;