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
import React, { useEffect, useState } from "react";
import { SubContext } from "../Store/Context";
import { useOktaAuth } from "@okta/okta-react";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router-dom";

const SideBar = () => {
  const { messageBoxHandler } = SubContext();
  const [user, setUser] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      if (!authState || !authState.isAuthenticated) {
        setUser(null);
      } else {
        oktaAuth.getUser().then((info) => {
          setUser(info);
        });
      }
    };
    getUser();
  }, [authState, oktaAuth]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        fetch("http://localhost:9000/", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authState.accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
    };
    fetchData();
  }, [user, authState]);

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
          <Badge variant="dot" color="success" overlap="circular">
            <Avatar
              sx={{
                bgcolor: "background.hover",
                color: "text.primary",
              }}
            >
              UC
            </Avatar>
          </Badge>
          <Typography>{"Umesh Chandhankeri"}</Typography>
        </Box>
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
          <Badge variant="dot" color="error" overlap="circular">
            <Avatar sx={{ bgcolor: "background.hover", color: "text.primary" }}>
              UC
            </Avatar>
          </Badge>
          <Typography>{"Umesh Chandhankeri"}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBar;
