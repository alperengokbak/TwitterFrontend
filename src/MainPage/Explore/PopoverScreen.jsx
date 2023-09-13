import { Button, Stack, Typography } from "@mui/material";
import React from "react";

// TODO - Popover büyümüyor.
export const PopoverScreen = () => {
  return (
    <Stack width="100%" direction="row" justifyContent="space-between">
      <Typography variant="h6" fontWeight="bold">
        Recent
      </Typography>
      <Button className="popoverButton" variant="contained">
        Clear all
      </Button>
      <Stack></Stack>
    </Stack>
  );
};
