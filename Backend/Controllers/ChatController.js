import { private_connection } from '../Modules/Connections.js';

export const add_private_connection = (req, res) => {
    private_connection.create({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        chat_id: req.body.chat_id,
    })
};