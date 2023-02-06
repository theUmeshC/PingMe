import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Badge } from "@mui/material";
import { UseContext } from "../Store/Context";

const SideBar = () => {
  const { messageBoxHandler } = UseContext();

  return (
    <Box
      flex={1}
      sx={{ bgcolor: "background.default", minWidth: "250px", height: "100%" }}
    >
      <Typography
        color={"text.primary"}
        sx={{
          bgcolor: "background.hover",
          display: "flex",
          alignItems:'center',
          justifyContent: "center",
          height: "10%",
        }}
      >
        Contacts
      </Typography>
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
          <Badge variant="dot" color="success" overlap="circular">
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
