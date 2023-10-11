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
            query += ` ORDER BY end_time`
            console.log('query: ', query);
            const results = await pool.query(query, [userId, dateTime]);
            console.log(results[0]);
            return results[0];
        } catch (error) {
            console.error('Error in getSessions: ', error);
            throw error;
        }
    },

}

export default sessionService;