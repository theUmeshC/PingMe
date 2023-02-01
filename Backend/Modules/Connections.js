import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

export const private_connection = sequelize.define("private_connects",{
    sender_id: {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export const group_connection = sequelize.define("group_connects",{
    user_id: {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export const chats = sequelize.define('chats', {
    chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});