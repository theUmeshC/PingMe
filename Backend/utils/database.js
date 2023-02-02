import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize('chat-db', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres' ,
  });

export default sequelize;
