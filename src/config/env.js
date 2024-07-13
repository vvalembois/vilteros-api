import dotenv from 'dotenv';

dotenv.config();

export default {
	NODE_ENV: process.env.NODE_ENV,
	URL: process.env.URL || ('http://localhost:' + (process.env.SERVER_PORT || 3000)),
	PORT: process.env.SERVER_PORT || 3000,
	DB_URL: process.env.DB_URL,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME
};