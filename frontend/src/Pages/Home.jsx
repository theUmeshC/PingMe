import { Divider, Stack } from "@mui/material";
import React from "react";
import ChatBox from "../Components/ChatBox";
import SideBar from "../Components/SideBar";

const Home = () => {
  return (
    <Stack direction='row' justifyContent='space-evenly' height='90vh'
    divider={<Divider orientation="vertical" flexItem />}
    >
      <SideBar />
      <ChatBox />
    </Stack>
  );
};

export default Home;
