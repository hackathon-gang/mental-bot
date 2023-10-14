import pool from '../config/database.js';

const userService = {
    postNewUser: async (values) => {

        try {
            let query = `SELECT * FROM m_user_login WHERE email = ?`;
            const rows = await pool.query(query, [values.email]);

            console.log("user login data: ", rows[0]);
            if (rows[0].length > 0) {
                return rows[0][0].uid;
            }

            query = `
            INSERT INTO m_user_login (username, login_method, email, picture, given_name) VALUES (?, ?, ?, ?, ?)
            `;
            const result = await pool.query(query, [values.name, values.method, values.email, values.picture, values.given_name]);
            console.log("user insert result: ", result[0]);
            return result[0].insertId;
        }
        catch (error) {
            console.error('Error in postNewUser: ', error);
            throw error;
        }
    },
    getUserById: async (uid) => {
        try {
            const query = `
            SELECT * FROM m_user_login WHERE uid = ?;
            `;
            const result = await pool.query(query, [uid]);
            console.log(result[0]);
            return result[0];
        }
        catch (error) {
            console.error('Error in getUserById: ', error);
            throw error;
        }
    }
};

export default userService;