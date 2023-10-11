import pool from "../config/database.js";

const cbtService = {
    getCBTQuestions: async () => {

        try {
            const query = `
            SELECT * FROM m_questions;
            `;
            const results = await pool.query(query, []);
            console.log(results);
            return results[0];
        }
        catch(error) {
            console.error('Error in getCBTQuestions: ', error);
            throw error;
        }
    },

    saveCBTResult: async(questionArr, answerArr, messageId, sessionId) => {

        try {

            let valueArr = [];
            for(let i = 0; i < questionArr.length; i++) {
                valueArr.push([sessionId, messageId, questionArr[i], answerArr[i]]);
            }
            console.log(valueArr);

            const query = `
            INSERT INTO m_reports (sid, mid, qid, answer) VALUES ?;
            `;
            const results = await pool.query(query, [valueArr]);
            console.log(results[0]);
            return results[0].affectedRows > 0;
        }
        catch(error) {
            console.error('Error in saveCBTResult: ', error);
            throw error;
        }
    }
};

export default cbtService;