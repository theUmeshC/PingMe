import {
  AppBar,
  Avatar,
  Badge,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";

const ChatBox = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const status = "seen";

  const handleEmojiBox = () => {
    setEmojiOpen((prev) => !prev);
  };

  const handleEmojiSelect = (object) => {
    setMessageToSend((prev) => `${prev}${object.emoji}`);
  };

  const handleMessageChange = (e) => {
    setMessageToSend(e.target.value);
  };

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
        <Badge variant="dot" color="success" overlap="circular">
          <Avatar
            sx={{ bgcolor: "background.selected", color: "text.primary" }}
          >
            UC
          </Avatar>
        </Badge>
        <Typography color={"text.primary"}>Mahesh</Typography>
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
            hi
          </Typography>
          <Typography variant="h6" align="right" sx={{ fontSize: "12px" }}>
            {status}
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "10px",
            bgcolor: "background.selected",
            padding: "5px",
            color: "text.primary",
          }}
        >
          <Typography variant="h6" align="right" sx={{ fontSize: "18px" }}>
            hi
          </Typography>
          <Typography variant="h6" align="right" sx={{ fontSize: "12px" }}>
            {status}
          </Typography>
        </Box>
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
          <SendIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
