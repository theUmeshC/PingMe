import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

const Users = sequelize.define("Users", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    default: 'offline',
  }
});

export default Users;
