import React from "react";
import { Stack, Divider, useMediaQuery } from "@mui/material";
import { UserTabs } from "./UserTabs";
import { MessagesPage } from "./MessagesPage";

const myDivider = (
  <Divider
    sx={{
      borderLeft: "1px solid rgb(239, 243, 244)",
    }}
    orientation="vertical"
    flexItem
  />
);

export const Message = () => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Stack direction="row" height="100vh">
      {isDesktop ? <UserTabs /> : null}
      {isDesktop ? myDivider : null}
      <MessagesPage />
      {myDivider}
    </Stack>
  );
};
