import { Divider, Fab, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Layout/SideBar";
import { UseContext } from "../Store/Context";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";

const Home = () => {
  const { messageBox } = UseContext();
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState(null);

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
        const response = axios({
          method: "post",
          url: "http://localhost:9000/users/login",
          headers: {
            Authorization: `Bearer ${authState.accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            user,
          },
        });

        response.then((val) => console.log(val));
      }
    };
    fetchData();
  }, [user, authState]);

  return (
    <>
      <Fab
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: "7px",
          left: "7px",
          bgcolor: "background.hover",
          color: "white",
          "&:hover": {
            bgcolor: "background.selected",
          },
        }}
      >
        <MessageIcon />
      </Fab>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: { sm: "none", xs: "flex" } }}
      >
        {messageBox === false ? <SideBar /> : <ChatBox />}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: { sm: "flex", xs: "none" } }}
      >
        <SideBar />
        <ChatBox />
      </Stack>
    </>
  );
};

export default Home;
