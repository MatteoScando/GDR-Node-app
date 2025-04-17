import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
});

pool.on("connect", () => {
  console.log("🟢 Connessione al database riuscita!");
});

pool.on("error", (err) => {
  console.error("🔴 Errore nella connessione al database!", err);
});

export const query = (text: string, params?: any) => pool.query(text, params);
