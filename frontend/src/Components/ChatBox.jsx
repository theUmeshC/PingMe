import {
  AppBar,
  Avatar,
  Badge,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SubContext } from "../Store/Context";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

const ChatBox = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const status = "seen";
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

  const handleSendMessage = () => {
    const response = axios({
      method: "post",
      url: "http://localhost:9000/chat/sendMessage",
      headers: {
        Authorization: `Bearer ${authState.accessToken.accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        chatId: friend.chat_id,
        senderId: friend.user_id,
        message: messageToSend,
      },
    });
    response.then((messages) => {
      setMessages(messages.data);
    });
  };

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
        }}
      >
        <ArrowBackIcon
          sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
          onClick={() => messageBoxHandler(null)}
        />

        <Badge variant="dot" color="success" overlap="circular">
          <Avatar
            sx={{ bgcolor: "background.selected", color: "text.primary" }}
          >
            {friend &&`${friend?.firstname[0]}${friend?.lastname[0]}`}
          </Avatar>
        </Badge>
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
            message.sender_id === friend.user_id ? (
              <Box
                sx={{
                  margin: "10px",
                  bgcolor: "background.selected",
                  padding: "5px",
                  color: "text.primary",
                }}
              >
                <Typography
                  variant="h6"
                  align="right"
                  sx={{ fontSize: "18px" }}
                >
                  {message.messages}
                </Typography>
                <Typography
                  variant="h6"
                  align="right"
                  sx={{ fontSize: "12px" }}
                >
                  {/* {message.timestamp} */}
                  {status}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  margin: "10px",
                  bgcolor: "background.hover",
                  padding: "5px",
                  color: "text.primary",
                }}
              >
                <Typography variant="span" sx={{ fontSize: "15px" }}>
                  Umesh
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  {message.messages}
                </Typography>
                <Typography
                  variant="h6"
                  align="right"
                  sx={{ fontSize: "12px" }}
                >
                  {message.timestamp}
                </Typography>
              </Box>
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
                top: "-300px",
                left: "10px",
              }}
            >
              <EmojiPicker
                height={300}
                width="300px"
                onEmojiClick={handleEmojiSelect}
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
