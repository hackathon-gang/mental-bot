import config from "../config/config.js";
import pool from "../config/database.js";
import openai from "../config/openai.js";

const chatService = {
    summarizeChat: async (text, callback) => {
        text += "\nCan you summarize and include important points from first person perspective?";
        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": text}]
            });
            return callback(null, chat.choices[0].message.content);
        }
        catch(err) {
            return callback(err, null);
        }
    }
};

export default chatService;