import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

const Users = sequelize.define("Users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    default: 'offline',
  }
});

export default Users;
