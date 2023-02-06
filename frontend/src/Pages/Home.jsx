import { Divider, Stack } from "@mui/material";
import React from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Components/SideBar";
import { UseContext } from "../Store/Context";

const Home = () => {
  const { messageBox } = UseContext();

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
