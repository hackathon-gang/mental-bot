import pool from "../config/database.js";
import openai from "../config/openai.js";

const chatService = {

    saveChat: async (sessionId, chatText, byUser) => {
        console.log('chatText: ', chatText);
        try {
            const saveChatQuery = `
          INSERT INTO m_message (sid, message, by_user) VALUES (?,?,?);
            `;
            const results = await pool.query(saveChatQuery, [
                sessionId,
                chatText,
                byUser
            ]);
            console.log(results[0]);
            return results[0].affectedRows > 0;
        } catch (error) {
            console.error('Error in saveChat: ', error);
            throw error;
        }
    },

    summarizeChat: async (text, callback) => {
        text += "\nCan you summarize straight to the point and include important points from the second person's perspective using \"You\"?";
        console.log('text: ', text);
        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": text }]
            });
            return callback(null, chat.choices[0].message.content);
        }
        catch (err) {
            return callback(err, null);
        }
    },

    saveSummary: async (messageId, summarizedText) => {
        console.log('summarizedText: ', summarizedText);
        try {
            const saveSummaryQuery = `
          INSERT INTO m_summary (mid, summary) VALUES (?,?);
            `;
            const results = await pool.query(saveSummaryQuery, [
                messageId,
                summarizedText
            ]);
            console.log(results[0]);
            return results[0].affectedRows > 0;
        } catch (error) {
            console.error('Error in saveSummary: ', error);
            throw error;
        }
    },

    giveSuggestions: async (summarizedText, callback) => {
        summarizedText += "\nCan you provide suggestions on how to improve the situation?";
        console.log('text: ', summarizedText);
        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": summarizedText }]
            });
            return callback(null, chat.choices[0].message.content);
        }
        catch (err) {
            return callback(err, null);
        }
    }
};

export default chatService;