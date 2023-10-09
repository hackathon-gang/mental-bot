// /*
// const mysql = require('mysql');
// const config = require('./config');
// //To find out more on createPool:
// //https://www.npmjs.com/package/mysql#pooling-connections

// const pool = mysql.createPool({
//         connectionLimit: 100,
//         host: 'aws.connect.psdb.cloud',
//         port: 3306,
//         user: config.databaseUserName,
//         password: config.databasePassword,
//         database: config.databaseName,
//         multipleStatements: true
//     });

//  module.exports=pool;
//  */

// //////////////////////////////////////////////////////////////////////////
// // INCLUDES
// //////////////////////////////////////////////////////////////////////////

// /* Include to use .env file */
// require('dotenv').config();
// const mysql = require('mysql2/promise')

// //////////////////////////////////////////////////////////////////////////
// // DATABASE_URL extracted from .env file
// //////////////////////////////////////////////////////////////////////////
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log("DB Connected")
// module.exports = connection;
// //////////////////////////////////////////////////////////////////////////
// // CONNECTION TO DB
// //////////////////////////////////////////////////////////////////////////


require('dotenv').config();
const mysql2 = require('mysql2/promise');
const config = require('./config');
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

module.exports = pool;
