import pool from "../config/database.js";

const sessionService = {

    getSessions: async (userId, dateTime) => {
        try {
            let query = `
            SELECT * FROM m_session WHERE uid = ?
            `;
            if (dateTime && dateTime != '') {
                query += ` AND start_time RLIKE ?`
            }
            query += ` ORDER BY start_time DESC`;
            console.log('query: ', query);
            const results = await pool.query(query, [userId, dateTime]);
            console.log(results[0]);
            return results[0];
        } catch (error) {
            console.error('Error in getSessions: ', error);
            throw error;
        }
    },

    saveSession: async (userId) => {
        console.log('userId: ', userId);
        try {
            const query = `
            INSERT INTO m_session (uid, end_time) VALUES (?, DATE_ADD(NOW(), INTERVAL 3 HOUR));
            `;
            const results = await pool.query(query, [userId]);
            console.log(results[0]);
            return results[0].insertId;
        } catch (error) {
            console.error('Error in saveSession: ', error);
            throw error;
        }
    },

}

export default sessionService;