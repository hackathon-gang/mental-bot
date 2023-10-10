import chatService from "../services/chatServices.js";

const chatController = {
    processChat: (req, res, next) => {
        let chatText = req.body.chatText;
        let userId = req.body.userId;

        chatService.summarizeChat(chatText, (err, data) => {
            if(err) {
                res.status(500).json({ message: err });
            }
            else {
                res.status(200).json({ message: data });
            }
        })
    }
};

export default chatController;