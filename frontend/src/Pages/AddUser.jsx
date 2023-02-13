import { AppBar, Avatar, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { v4 as uuidv4 } from "uuid";

const AddUsers = () => {
  const [users, setUsers] = useState(null);
  const { authState } = useOktaAuth();
  const userId = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    if (userId) {
      const response = axios({
        method: "post",
        url: "http://localhost:9000/chat/getAllUsers",
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          userId,
        },
      });
      response.then((val) => setUsers(val.data));
    }
  }, [authState, userId]);

  const addUserHandler = (id) => {
    console.log(userId, "jdsgajhd", id);
    if (userId && id) {
      const response = axios({
        method: "post",
        url: "http://localhost:9000/chat/addFriend",
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          senderId: userId,
          receiverId: id,
        },
      });
      response.then(() => console.log("added user to friends"));
    }
  };

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
        {users &&
          users.map((user) => (
            <Box
              key={uuidv4()}
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
                addUserHandler(user.user_id);
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "background.hover",
                  color: "text.primary",
                  border: "1px solid ",
                }}
              >
                {`${user.first_name[0]}${user.last_name[0]}`}
              </Avatar>
              <Typography sx={{ textAlign: "center" }}>
                {user.username}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default AddUsers;
