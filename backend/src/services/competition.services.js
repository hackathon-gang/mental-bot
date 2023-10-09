const pool = require('../config/database');

// get all competitions
module.exports.getAllCompetitions = async () => {
    console.log('getAllCompetitions is called');
    try {
        const competitionsDataQuery = `
      SELECT * FROM competition;
        `;
        const results = await pool.query(competitionsDataQuery);
        console.log(results[0]);
        return results[0];
    } catch (error) {
        console.error('Error in getAllCompetitions: ', error);
        throw error;
    }
};