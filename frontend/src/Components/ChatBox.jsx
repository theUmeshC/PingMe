import { Box, Typography } from "@mui/material";
import React from "react";
import { UseContext } from "../Store/Context";

const ChatBox = () => {
  const { messageBox } = UseContext();

  return (
    messageBox && (
      <Box flex={3} sx={{ bgcolor: "background.default" }}>
        <Typography color={"text.primary"}>ChatBox</Typography>
      </Box>
    )
  );
};

export default ChatBox;
