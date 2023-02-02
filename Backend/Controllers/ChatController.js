import { user_private_connections } from '../Modules/Connections.js';

export const add_private_connection = (req, res) => {
    user_private_connections.create({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        chat_id: req.body.chat_id,
    })
};