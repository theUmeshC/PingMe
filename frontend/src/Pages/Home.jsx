import { Divider, Fab, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect } from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Layout/SideBar";
import { UseContext } from "../Store/Context";
import MessageIcon from "@mui/icons-material/Message";

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
      <Fab
        aria-label="add"
        sx={{ position: "absolute", bottom: "7px", left: "7px" , bgcolor:'background.hover', color:'white', '&:hover': {
          bgcolor: 'background.selected'
        }}}
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
