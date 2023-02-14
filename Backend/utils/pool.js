import pg from "pg";
import { config } from "dotenv";

config();

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "PingMe-db",
  multipleStatements: true,
});

export default pool;