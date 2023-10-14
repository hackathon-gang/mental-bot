import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config({path: join(dirname(fileURLToPath(import.meta.url)), '../../.env')});

const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    chatgptapikey: process.env.CHATGPT_API_KEY,
    JWTkey: process.env.JWT_KEY
};

export default config;