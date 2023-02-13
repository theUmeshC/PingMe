import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

const Users = sequelize.define("Users", {
  user_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export default Users;
