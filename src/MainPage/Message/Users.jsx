import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export const Users = ({
  firstName,
  lastName,
  username,
  is_verified,
  profile_picture,
  id,
}) => {
  console.log(firstName, lastName, username, is_verified, profile_picture, id);
  return (
    <Stack
      direction="row"
      p={1.5}
      spacing={1.5}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgb(239, 243, 244)",
        },
      }}
    >
      <Avatar src={profile_picture} />
      <Stack>
        <Typography variant="body2" fontWeight="bold">
          {firstName}
          {lastName}
        </Typography>
        <Typography variant="span" color="rgb(83, 100, 113)">
          @{username}
        </Typography>
      </Stack>
    </Stack>
  );
};
