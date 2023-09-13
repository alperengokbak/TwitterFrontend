import { Button, Stack, Typography } from "@mui/material";
import React from "react";

export const PopoverScreen = () => {
  return (
    <Stack width="100%" direction="row" justifyContent="space-between">
      <Typography variant="body1" fontWeight="bold">
        Recent
      </Typography>
      <Button className="popoverButton" variant="contained">
        Clear all
      </Button>
      <Stack></Stack>
    </Stack>
  );
};
