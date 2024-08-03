import pg from "pg";
const { Pool } = pg;
import "dotenv/config";
import {string} from "zod";

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: true,
  //   // ca: '/path/to/ca.crt' (Optional: trusted CA certificate)
  },
});
