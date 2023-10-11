import chatService from "../services/chatServices.js";

const chatController = {
    processChat: (req, res, next) => {
        let chatText = req.body.chatText;
        let userId = req.body.userId;

        res.status(200).json({ message: "success" });
    }
};

export default chatController;