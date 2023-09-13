import { Button, Stack, Typography } from "@mui/material";
import React from "react";

export const Unfollow = ({
  username,
  handleCloseUnfollowModal,
  handleUnfollow,
  userInformation,
}) => {
  return (
    <Stack width="100%" height="100%">
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        {`Unfollow @${username}`}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          color: "gray",
          marginTop: "10px",
        }}
      >
        Their Tweets will no longer show up in your home timeline. You can still
        view their profile, unless their Tweets are protected.
      </Typography>
      <Stack flexDirection="column">
        <Button
          onClick={() => {
            handleUnfollow(userInformation.id);
          }}
          variant="contained"
          sx={{
            marginTop: "20px",
            height: "44px",
            backgroundColor: "#000",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
              color: "#FFF",
              backgroundColor: "#000",
              opacity: "0.9",
            },
          }}
        >
          Unfollow
        </Button>
        <Button
          onClick={() => {
            handleCloseUnfollowModal();
          }}
          variant="contained"
          sx={{
            marginTop: "10px",
            height: "44px",
            backgroundColor: "white",
            color: "#000",
            boxShadow: "none",
            border: "1px solid #D3D3D3",
            "&:hover": {
              backgroundColor: "#D3D3D3",
              boxShadow: "none",
            },
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};
