import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { SubContext } from "../Store/Context";

const Group = ({ friend, socket }) => {
  const { messageBoxHandler, friendHandler } = SubContext();
  const openMessageHandler = (friend) => {
    const ctx = {...friend, isGroup: true}
    messageBoxHandler();
    friendHandler(ctx);
    socket?.emit("join room", friend.chat_id);
  };
  return (
    <Box
      sx={{
        bgcolor: "background.selected",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "5px",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "background.hover",
        },
      }}
      onClick={() => {
        openMessageHandler(friend);
      }}
    >
      <Avatar
        sx={{
          bgcolor: "background.hover",
          color: "text.primary",
        }}
      >
        {`${friend.group_name[0]}${friend.group_name[1]}`}
      </Avatar>
      <Typography>{friend.group_name}-Group</Typography>
    </Box>
  );
};

export default Group;
