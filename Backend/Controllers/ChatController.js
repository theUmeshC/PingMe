import { v4 as uuidv4 } from "uuid";

import pool from "../utils/pool.js";

export const addFriend = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const [connect] = (
    await pool.query(
      "SELECT * FROM friends where (sender_id = $1 and receiver_id =$2) or (sender_id = $2 and receiver_id =$1)",
      [senderId, receiverId]
    )
  ).rows;

  if (!connect) {
    const data = (
      await pool.query("INSERT INTO friends values($1, $2, $3)", [
        uuidv4(),
        senderId,
        receiverId,
      ])
    ).rows;

    res.json({ data, message: "added to friends list" });

  } else {
    console.log("already friends");
    res.json({ message: "already friends" });
  }

};

export const get_all_users = async (req, res) => {
  const { userId } = req.body;

  try {
    const users = (
      await pool.query("select * from users where user_id != $1", [userId])
    ).rows;
    console.log(users);
    res.json(users);
  } catch (error) {
    return res.error(error);
  }

};

export const getFriends = async (req, res) => {
  const { userId } = req.body;
  let friends = [];
  const data = (
    await pool.query(
      "select users.* , friends.chat_id from users inner join friends on users.user_id = friends.sender_id AND friends.receiver_id= $1",
      [userId]
    )
  ).rows;
  const receiverData = (
    await pool.query(
      "select users.* , friends.chat_id from users inner join friends on users.user_id = friends.receiver_id AND friends.sender_id= $1",
      [userId]
    )
  ).rows;
  friends = [...data, ...receiverData];
  res.json(friends);
};

export const getMessages = async (req, res) => {
  const { chatId } = req.body;
  const messages = (
    await pool.query("select messages, sender_id, timestamp from chat where chat_id =$1", [chatId])
  ).rows;
  res.json(messages);
};

export const addMessage = async (req, res) => {

  const { chatId, senderId, message } = req.body;
  
  await pool.query("insert into chat values($1, $2, $3, $4)", [
    chatId,
    message,
    senderId,
    new Date(),
  ]);

  const messages = (
    await pool.query("select messages, sender_id, timestamp from chat where chat_id =$1", [chatId])
  ).rows;

  res.json(messages);

};
