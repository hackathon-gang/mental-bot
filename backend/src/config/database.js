import mysql2 from 'mysql2/promise';
import config from './config.js';

const pool = mysql2.createPool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database,
    connectionLimit: config.connectionLimit,
    multipleStatements: true,
    ssl: {
        rejectUnauthorized: false,
    },
    timezone: '+00:00',
});

export default pool;