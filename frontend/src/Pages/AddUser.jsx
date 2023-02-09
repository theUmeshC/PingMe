import { AppBar, Avatar, Box, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const AddUsers = () => {
  const addUserHandler = () => {};
  return (
    <Box sx={{ height: "90vh" }}>
      <AppBar
        position="relative"
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          color: "text.primary",
          height: "10%",
        }}
      >
        <Stack
          direction="row"
          gap={2}
          sx={{
            color: "text.primary",
          }}
        >
          <Link to="/home">
            <ArrowBackIcon
              sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
            />
          </Link>
          <Typography>Add Friends</Typography>
        </Stack>
        <TextField size="small" sx={{ width: "60%" }} />
      </AppBar>
      <Box sx={{ height: "90%", bgcolor: "background.default" }}>
        <Box
          sx={{
            bgcolor: "background.selected",
            color: "text.primary",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "5px",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "background.hover",
            },
          }}
          onClick={() => {
            addUserHandler("user");
          }}
        >
          <Avatar
            sx={{
              bgcolor: "background.hover",
              color: "text.primary",
              border: "1px solid ",
            }}
          ></Avatar>
          <Typography sx={{ textAlign: "center" }}>
            {"Umesh Chandhankeri"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUsers;
