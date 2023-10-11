import pool from "../config/database.js";
import openai from "../config/openai.js";

const chatService = {

    saveChat: async (sessionId, chatText, byUser) => {
        console.log('chatText: ', chatText);
        try {
            const query = `
            INSERT INTO m_message (sid, message, by_user) VALUES (?,?,?);
            `;
            const results = await pool.query(query, [sessionId, chatText, byUser]);
            console.log(results[0]);
            return results[0].insertId;
        } catch (error) {
            console.error('Error in saveChat: ', error);
            throw error;
        }
    },

    summarizeChat: async (text) => {
        text += "\nCan you summarize straight to the point and include important points from the second person's perspective using \"You\"?";
        console.log('text: ', text);

        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": text }]
            });
            console.log(chat.choices[0].message.content);
            return chat.choices[0].message.content;
        }
        catch (error) {
            console.error('Error in summarizeChat: ', error);
            throw error;
        }
    },

    generateCBTAnswers: async (text, questions) => {
        text += "\nExtract the answers from the above text based on the following questions.";
        text += questions;

        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": text }]
            });
            console.log(chat.choices[0].message.content);
            return chat.choices[0].message.content;
        }
        catch (error) {
            console.error('Error in generateCBTAnswers: ', error);
            throw error;
        }
    },

    saveSummary: async (messageId, summarizedText) => {
        console.log('summarizedText: ', summarizedText);

        try {
            const query = `
            INSERT INTO m_summary (mid, summary) VALUES (?,?);
            `;
            const results = await pool.query(query, [messageId, summarizedText]);
            console.log(results[0]);
            return results[0].affectedRows > 0;
        } catch (error) {
            console.error('Error in saveSummary: ', error);
            throw error;
        }
    },

    giveSuggestions: async (summarizedText) => {
        summarizedText += "\nCan you provide suggestions on how to improve the situation?";
        console.log('text: ', summarizedText);

        try {
            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": summarizedText }]
            });
            return chat.choices[0].message.content;
        }
        catch (error) {
            console.error('Error in giveSuggestions: ', error);
            throw error;
        }
    },

    getChats: async (sessionId, userId) => {
        try {
            const query = `
            SELECT m.* FROM m_message m, m_session s WHERE m.sid = ? AND s.uid = ? AND m.sid = s.sid ORDER BY m.date_time;
            `;
            const results = await pool.query(query, [sessionId, userId]);
            console.log(results[0]);
            return results[0];
        } catch (error) {
            console.error('Error in getChats: ', error);
            throw error;
        }
    },

};

export default chatService;