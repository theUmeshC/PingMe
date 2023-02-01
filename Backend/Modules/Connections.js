import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

export const private_connection = sequelize.define("private_connects",{
    sender_id: {
        type : Sequelize.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// export const group_connection = sequelize.define("group_connects",{
//     user_id: {
//         type : Sequelize.NUMBER,
//         allowNull: false,
//         default: 1,

//     },
//     group_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         default: 1,

//     },
//     chat_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         default: 1,

//     }
// });

// export const chats = sequelize.define('chats', {
//     chat_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         default: 1,

//     },
//     message: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         default: 'HELLO',
//     },
// });