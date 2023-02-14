import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Badge,
  SpeedDial,
} from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import { SubContext } from "../Store/Context";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SideBar = ({ user }) => {
  const userId = user && user.user_id;
  const { authState } = useOktaAuth();
  const { messageBoxHandler } = SubContext();
  const history = useHistory();
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    if (userId) {
      const response = axios({
        method: "post",
        url: "http://localhost:9000/chat/getFriends",
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          userId,
        },
      });
      response.then((val) => setFriends(val.data));
    }
  }, [userId, authState]);

  return (
    <Box
      flex={1}
      sx={{ bgcolor: "background.default", minWidth: "250px", height: "100%" }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          sx={{ bgcolor: "background.hover" }}
          key="addUser"
          icon={<AccountCircleIcon sx={{ color: "text.primary" }} />}
          tooltipTitle="Add Contact"
          onClick={() => history.replace("/addContact")}
        />
        <SpeedDialAction
          sx={{ bgcolor: "background.hover" }}
          key="addGroup"
          icon={<GroupsIcon sx={{ color: "text.primary" }} />}
          tooltipTitle="Create Group"
          onClick={() => history.replace("/addGroup")}
        />
      </SpeedDial>
      <AppBar
        position="static"
        sx={{
          bgcolor: "background.hover",
          height: "10%",
        }}
      >
        <Typography
          color={"text.primary"}
          sx={{
            margin: "auto",
          }}
        >
          Contacts
        </Typography>
      </AppBar>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        sx={{ height: "90%", overflow: "auto" }}
      >
        {friends &&
          friends.map((friend) => (
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
                messageBoxHandler();
              }}
            >
              {friend.status === "online" ? (
                <Badge variant="dot" color="success" overlap="circular">
                  <Avatar
                    sx={{
                      bgcolor: "background.hover",
                      color: "text.primary",
                    }}
                  >
                    {`${friend.firstname[0]}${friend.lastname[0]}`}
                  </Avatar>
                </Badge>
              ) : (
                <Badge variant="dot" color="error" overlap="circular">
                  <Avatar
                    sx={{
                      bgcolor: "background.hover",
                      color: "text.primary",
                    }}
                  >
                    {`${friend.firstname[0]}${friend.lastname[0]}`}
                  </Avatar>
                </Badge>
              )}
              <Typography>{friend.username}</Typography>
            </Box>
          ))}
      </Stack>
    </Box>
  );
};

export default SideBar;
