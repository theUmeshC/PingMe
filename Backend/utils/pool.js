import pg from "pg";
import { config } from "dotenv";

config();

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOSTNAME,
  port: 5432,
  database: "database_pingme",
  multipleStatements: true,
});

export default pool;
