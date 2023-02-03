import { AppBar, Box, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";
import { ColorContext } from "../Store/themeContext";

const NavBar = () => {
  const { mode, toggleMode } = ColorContext();
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.navBg",
        height: "10vh",
        minHeight: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" },
            color: "text.primary",
          }}
        >
          Ping Me
        </Typography>
        <TelegramIcon
          sx={{ display: { xs: "block", sm: "none" }, margin: 0 }}
        />
      </Box>
      {mode === "light" ? (
        <LightModeIcon
          sx={{ cursor: "pointer" }}
          onClick={() => toggleMode()}
        />
      ) : (
        <Brightness4Icon
          sx={{ cursor: "pointer" }}
          onClick={() => toggleMode()}
        />
      )}
    </AppBar>
  );
};

export default NavBar;
