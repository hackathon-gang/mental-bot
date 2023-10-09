// /* Idk what zay did so I will just comment it out 
// //config.js
// const dotenv = require('dotenv');
// dotenv.config(); //Build the process.env object.
// module.exports = {
//     databaseUserName: process.env.DB_USERNAME,
//     databasePassword: process.env.DB_PASSWORD,
//     databaseName: process.env.DB_DATABASE_NAME
// };
// //Reference:
// //https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
// */

// //------------------
// // Config
// //------------------
// //api key
// let secret = "efjewnkcdjjfkcnjncsnsknknkssk";
// //------------------
// //------------------
// // Exports
// //------------------
// module.exports.key = secret;


const dotenv = require('dotenv');
const path = require('path');
// to access the env file in root dir, we must add path for that file
//use path.join to help avoiding error for platform syntax (window \, unix-based /)
dotenv.config({ path: path.join(__dirname, '../../.env') });
module.exports = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
};
