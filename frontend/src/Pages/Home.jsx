import { Divider, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect } from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Components/SideBar";
import { UseContext } from "../Store/Context";

const Home = () => {
  const { messageBox, handleUserInfo } = UseContext();
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      handleUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        handleUserInfo(info);
      });
    }
  }, [authState, oktaAuth, handleUserInfo]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: {  sm: "none", xs: 'flex', } }}
      >
        {messageBox === false ? <SideBar /> : <ChatBox />}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        height="90vh"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ display: {  sm: "flex", xs: 'none', } }}
      >
        <SideBar />
        <ChatBox />
      </Stack>

    </>
    
  );
};

export default Home;
