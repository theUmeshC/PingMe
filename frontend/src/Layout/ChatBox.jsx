import { AppBar, Avatar, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SubContext } from "../Store/Context";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import MyMessage from "../Components/MyMessage";
import FriendMessage from "../Components/FriendMessage";
import { v4 as uuidv4 } from "uuid";
import { ColorContext } from "../Store/themeContext";

const ChatBox = ({ user, socket }) => {
  const scrollRef = useRef();
  const { mode } = ColorContext();
  const [messageToSend, setMessageToSend] = useState("");
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const { messageBoxHandler, friend } = SubContext();
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState([]);

  const handleEmojiBox = () => {
    setEmojiOpen((prev) => !prev);
  };

  const handleEmojiSelect = (object) => {
    setMessageToSend((prev) => `${prev}${object.emoji}`);
  };

  const handleMessageChange = (e) => {
    setMessageToSend(e.target.value);
  };

  const handleFocus = () => {
    setEmojiOpen(false);
  };

  const handleSendMessage = () => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:9000/chat/sendMessage",
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          chatId: friend.chat_id,
          senderId: user.user_id,
          message: messageToSend,
        },
      });
      response.then((messages) => {
        setMessages(messages.data);
      });
    } catch (err) {
      console.log(err);
    }
    socket.emit("send message", messageToSend, friend.chat_id, friend.user_id);
    setMessageToSend("");
  };

  useEffect(() => {
    socket?.on("receive message", (data) => {      
      setMessages((prev) => [
        ...prev,
        {
          messages: data.newMessage,
          senderId: data.senderId,
          timeStamp: data.timeStamp,
        },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    if (friend) {
      const response = axios({
        method: "post",
        url: "http://localhost:9000/chat/getMessages",
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          chatId: friend.chat_id,
        },
      });
      response.then((messages) => {
        setMessages(messages.data);
      });
    }
  }, [authState, friend]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box flex={3} sx={{ bgcolor: "background.default" }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "background.hover",
          height: "10%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid purple",
        }}
      >
        <ArrowBackIcon
          sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
          onClick={() => messageBoxHandler(null)}
        />
        <Avatar sx={{ bgcolor: "background.selected", color: "text.primary" }}>
          {friend && `${friend?.firstname[0]}${friend?.lastname[0]}`}
        </Avatar>
        <Typography color={"text.primary"}>{friend?.username}</Typography>
      </AppBar>
      <Box
        sx={{
          height: "80%",
          bgcolor: "background.default",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages &&
          messages.map((message) =>
            message.sender_id === user.user_id ? (
              <div ref={scrollRef} key={uuidv4()}>
                <MyMessage message={message} friend={friend} />
              </div>
            ) : (
              <div ref={scrollRef} key={uuidv4()}>
                <FriendMessage message={message} friend={friend} />
              </div>
            )
          )}
      </Box>
      <Box
        sx={{
          height: "10%",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            bgcolor: "background.hover",
            color: "text.primary",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            position: "relative",
          }}
        >
          <SentimentSatisfiedAltIcon
            sx={{ color: "yellow" }}
            onClick={() => handleEmojiBox()}
          />
          {isEmojiOpen === true ? (
            <Box
              sx={{
                position: "absolute",
                top: "-350px",
                left: "10px",
              }}
            >
              <EmojiPicker
                height={350}
                width="300px"
                onEmojiClick={handleEmojiSelect}
                theme={mode}
              />
            </Box>
          ) : null}
          <TextField
            value={messageToSend}
            size="small"
            variant="standard"
            sx={{
              width: "80%",
              bgcolor: "background.selected",
              padding: "7px",
            }}
            onChange={handleMessageChange}
            onFocus={handleFocus}
          />
          <SendIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
