import { AppBar, Box, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const AddUsers = () => {
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
        <Link to="/home">
          <Stack
            direction="row"
            gap={2}
            sx={{
              color: "text.primary",
            }}
          >
            <ArrowBackIcon
              sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
            />
            <Typography>Add Friends</Typography>
          </Stack>
        </Link>
        <TextField size="small" sx={{ width: "60%" }} />
      </AppBar>
      <Box sx={{ height: "90%", bgcolor: "background.default" }}></Box>
    </Box>
  );
};

export default AddUsers;
