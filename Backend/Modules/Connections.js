import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

export const private_connection = sequelize.define(
  "individual_connect",
  {
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    receiver_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamp: false,
  }
);

export const group_connection = sequelize.define(
  "group_connect",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamp: false,
  }
);

export const chat = sequelize.define(
  "chat",
  {
    chat_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
);

chat.hasMany(private_connection, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

private_connection.belongsTo(chat);


chat.hasMany(group_connection, {
    foreignKey: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  
  group_connection.belongsTo(chat);