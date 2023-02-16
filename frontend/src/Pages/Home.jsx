import { Divider, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import ChatBox from "../Layout/ChatBox";
import SideBar from "../Layout/SideBar";
import { SubContext } from "../Store/Context";
import axios from "axios";
import io from "socket.io-client";

var socket;
const Home = ({ updateUser }) => {
  const { messageBox } = SubContext();
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:9000");
  }, []);

  useEffect(() => {
    dbUser && socket.emit("login", dbUser.user_id);
  }, [dbUser]);

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

        response.then((val) => {
          updateUser(val.data);
          setDbUser(val.data);
        });
      }
    };
    fetchData();
  }, [user, authState, updateUser]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: { sm: "none", xs: "flex" } }}
      >
        {messageBox === false ? (
          <SideBar user={dbUser} socket={socket}/>
        ) : (
          <ChatBox user={dbUser}socket={socket} />
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: { sm: "flex", xs: "none" } }}
      >
        <SideBar user={dbUser} socket={socket}/>
        <ChatBox user={dbUser} socket={socket}/>
      </Stack>
    </>
  );
};

export default Home;
