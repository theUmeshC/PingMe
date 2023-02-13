import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";
import Users from "./Users.js";

export const user_private_connections = sequelize.define(
  "user_private_connection",
  {
    chat_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  }
);

export const user_group_participants = sequelize.define(
  "user_group_participant",
  {}
);

export const user_group_connection = sequelize.define("user_group_connection", {
  group_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  group_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  chat_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export const chat = sequelize.define("chat", {
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending",
  },
});

Users.hasMany(user_private_connections, {
  as: "receiver_id",
  foreignKey: "receiver_id",
});

user_private_connections.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(user_private_connections, {
  as: "sender_id",
  foreignKey: "sender_id",
});

user_private_connections.belongsTo(Users, { foreignKey: "user_id" });

user_private_connections.hasOne(chat, {
  foreignKey: "chat_id",
});

chat.belongsTo(user_private_connections, { foreignKey: "chat_id" });

user_group_connection.hasMany(user_group_participants, {
  foreignKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

user_group_participants.belongsTo(user_group_connection);

Users.hasMany(user_group_participants, {
  foreignKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

user_group_participants.belongsTo(Users);
