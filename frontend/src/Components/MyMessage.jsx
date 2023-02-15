import { Box, Typography } from "@mui/material";
import React from "react";

const MyMessage = ({ message }) => {
  return (
    <Box
      sx={{
        margin: "10px",
        bgcolor: "background.selected",
        padding: "5px",
        color: "text.primary",
        width: "70%",
        position: "relative",
        left: "25%",
        borderRadius: '5px'
      }}
    >
      <Typography variant="h6" align="right" sx={{ fontSize: "16px" }}>
        {message.messages}
      </Typography>
    </Box>
  );
};

export default MyMessage;
