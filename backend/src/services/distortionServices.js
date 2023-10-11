import pool from "../config/database.js";

const distortionService = {
    getDistortions: async () => {

        try {
            const query = `
            SELECT distortions FROM m_distortions;
            `;
            const results = await pool.query(query, []);
            console.log(results);
            return results;
        }
        catch(error) {
            console.error('Error in getDistortions: ', error);
            throw error;
        }
    }
};

export default distortionService;