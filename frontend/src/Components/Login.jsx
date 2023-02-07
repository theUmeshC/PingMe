import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Login = ({ handleLogin }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Welcome to Chat App!</Typography>
      <button className="loginBtn" onClick={()=> handleLogin()}>Login</button>
    </Box>
  );
};

export default Login;
