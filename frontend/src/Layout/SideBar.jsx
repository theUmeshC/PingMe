import { AppBar, Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { UseContext } from "../Store/Context";
import { useOktaAuth } from "@okta/okta-react";

const SideBar = () => {
  const { messageBoxHandler } = UseContext();
  const [user, setUser] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();

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
            <Avatar sx={{ bgcolor: "background.hover", color: "text.primary" }}>
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
