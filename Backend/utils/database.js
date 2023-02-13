import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize('PingMeDb', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres' ,
  });

export default sequelize;
