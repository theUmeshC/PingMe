import { AppBar, Avatar, Badge, Box, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { ColorContext } from "../Store/themeContext";
import { UseContext } from "../Store/Context";
import { withOktaAuth } from "@okta/okta-react";

const NavBar = ({ oktaAuth }) => {
  const { mode, toggleMode } = ColorContext();
  const { userInfo } = UseContext();

  const userTag =
    userInfo && `${userInfo.given_name[0]}${userInfo.family_name[0]}`;

  const handleLogout = async () => {
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin + "/",
    });
  };

  return (
    <AppBar
      position="stick"
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
            color: "text.tertiary",
          }}
        >
          Ping Me <TelegramIcon />
        </Typography>
        <TelegramIcon
          sx={{ display: { xs: "block", sm: "none" }, margin: 0 }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <Badge variant="dot" color="success" overlap="circular">
          <Avatar sx={{ bgcolor: "background.default", color: "text.primary" }}>
            {userTag}
          </Avatar>
        </Badge>
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
        <LogoutIcon sx={{ cursor: "pointer" }} onClick={handleLogout} />
      </Box>
    </AppBar>
  );
};

export default withOktaAuth(NavBar);
