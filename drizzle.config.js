/** @type { import("drizzle-kit").Config } */
import dotenv from 'dotenv';

dotenv.config();

export default {
    driver: 'pg',
    schema: './db/schema.js',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
      },//eslint-disable-line
  };//eslint-disable-line