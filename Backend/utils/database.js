import Sequelize from "sequelize";

const sequelize = new Sequelize('chat-db', 'postgres', 'Cel@1234', {
    host: 'localhost',
    dialect: 'postgres' ,
  });

export default sequelize;
