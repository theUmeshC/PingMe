import React from "react";
import { Box, Typography } from "@mui/material";

const FriendMessage = ({message, friend}) => {
  return (
    <Box
      sx={{
        margin: "10px",
        bgcolor: "background.hover",
        padding: "5px",
        color: "text.primary",
        width: '70%'
      }}
    >
      <Typography variant="span" sx={{ fontSize: "14px" }}>
        {friend.username}
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        {message.messages}
      </Typography>
      <Typography variant="h6" align="right" sx={{ fontSize: "10px" }}>
        {message.timestamp}
      </Typography>
    </Box>
  );
};

export default FriendMessage;
