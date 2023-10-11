import pool from '../config/database.js';

const userService = {
    postNewUser: async (values) => {
        try {
            let query = `SELECT * FROM m_user_login WHERE username = ? OR email = ?`;
            const [rows] = await pool.query(query, [values.name, values.email]);

            console.log(rows);
            if (rows.length > 0) {
                const error = 'User exists|' + rows[0].uid;
                throw error;
            }
            query = `
            INSERT INTO m_user_login (username, login_method, email, picture, given_name) VALUES (?, ?, ?, ?, ?)
            `;
            const result = await pool.query(query, [values.name, values.method, values.email, values.picture, values.given_name]);
            console.log(result[0]);
            return result[0].insertId;
        }
        catch (error) {
            console.error('Error in postNewUser: ', error);
            throw error;
        }
    }
};

export default userService;