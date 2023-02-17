import React from "react";
import { Box, Typography } from "@mui/material";

const FriendMessage = ({ message }) => {
  return (
    <Box
      sx={{
        margin: "10px",
        bgcolor: "background.hover",
        padding: "5px",
        color: "text.primary",
        width: "70%",
        borderRadius: "5px",
      }}
    >
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
