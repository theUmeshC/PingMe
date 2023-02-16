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
import React from "react";
import { SubContext } from "../Store/Context";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useAxios from "../Helper/useAxios";

const SideBar = ({ user, socket }) => {
  const userId = JSON.parse(localStorage.getItem("user")).user_id;
  const { messageBoxHandler, friendHandler } = SubContext();
  const history = useHistory();

  const { data: friends } = useAxios("http://localhost:9000/chat/getFriends", {
    userId,
  });

  const { loading, data: groups } = useAxios(
    "http://localhost:9000/chat/getGroups",
    { userId }
  );

  if(!loading){
    console.log(groups);
  }

  const openMessageHandler = (friend) => {
    messageBoxHandler();
    friendHandler(friend);
    socket?.emit("join room", friend.chat_id);
  };

  return (
    <Box
      flex={1}
      sx={{
        bgcolor: "background.default",
        minWidth: "250px",
        height: "100%",
      }}
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
          borderBottom: "1px solid purple",
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
              key={uuidv4()}
              onClick={() => {
                openMessageHandler(friend);
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
