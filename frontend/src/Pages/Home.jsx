import { Divider, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Layout/SideBar";
import { SubContext } from "../Store/Context";
import axios from "axios";

const Home = ({ updateUser, dUser }) => {
  const { messageBox } = SubContext();
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

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
          setDbUser(val.data)
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
        {messageBox === false ? <SideBar user={dbUser} /> : <ChatBox />}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: { sm: "flex", xs: "none" } }}
      >
        <SideBar user={dbUser} />
        <ChatBox />
      </Stack>
    </>
  );
};

export default Home;
