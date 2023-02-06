import { Box, Typography } from "@mui/material";
import React from "react";

const ChatBox = () => {

  return (
      <Box flex={3} sx={{ bgcolor: "background.default" }}>
        <Typography color={"text.primary"}>ChatBox</Typography>
      </Box>
  );
};

export default ChatBox;
