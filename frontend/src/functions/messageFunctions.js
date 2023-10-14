import axios from "axios";

const messageFunctions = {
    getMessages: async (baseURL, token, sessionId) => {
        try {
            const response = await axios
                .get(`${baseURL}/api/user/${sessionId}/chats`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            console.log("message response: ", response);
            return response.data;
        }
        catch (error) {
            console.error("Error in getMessages: ", error);
            throw error;
        }
    },
    sendMessages: async (baseURL, token, text, sessionId) => {
        try {
            const response = await axios
                .post(`${baseURL}/api/user/${sessionId}/chat`, {
                    chatText: text
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Content-Type": 'application/json'
                    }
                })
            console.log("send message response: ", response);
            return response.data;
        }
        catch (error) {
            console.error("Error in sendMessages: ", error);
            alert("Error in sending message!");
        }
    },
    getAIMessage: async (baseURL, token, text, messageId, sessionId) => {
        try {
            const response = await axios
                .post(`${baseURL}/api/user/${sessionId}/chat/ai`, {
                    chatText: text,
                    messageId: messageId
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Content-Type": 'application/json'
                    }
                })
            console.log("get ai message response: ", response);
            return response.data;
        }
        catch (error) {
            console.error("Error in getAIMessage: ", error);
            alert("Error in AI message!");
        }
    }
};

export default messageFunctions;