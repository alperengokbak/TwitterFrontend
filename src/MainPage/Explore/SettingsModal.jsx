import React from "react";
import { Stack, Typography, Checkbox, Divider, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const SettingsModal = ({ handleCloseSettingsModal }) => {
  const [checkedLocation, setCheckedLocation] = React.useState(true);
  const [checkedPersonalization, setCheckedPersonalization] =
    React.useState(true);
  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center" p="16px 0px 0px 16px">
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
          onClick={handleCloseSettingsModal}
        />
        <Typography variant="h6" ml={4} fontWeight="bold">
          Explore Settings
        </Typography>
      </Stack>
      <Stack p="4px 0px 16px 16px" mt={1}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Location
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">
            Show content in this location:
          </Typography>
          <Checkbox
            checked={checkedLocation}
            onChange={(e) => {
              setCheckedLocation(e.target.checked);
            }}
            sx={{
              width: "20px",
              height: "20px",
              mr: "14px",
              color: "#000",
              "&.Mui-checked": {
                color: "#1DA1F2",
              },
            }}
          />
        </Stack>
        <Typography variant="span" color="rgb(83, 100, 113)" fontSize="14px">
          When this is on, you’ll see what’s happening around you right now.
        </Typography>
        {!checkedLocation ? (
          <Stack
            direction="row"
            mt={4}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              cursor: "pointer",
            }}
          >
            <Link
              sx={{
                display: "flex",
                textDecoration: "none",
              }}
            >
              Explore locations
            </Link>
            <KeyboardArrowRightIcon
              sx={{
                mr: "14px",
                height: "22px",
                width: "22px",
              }}
            />
          </Stack>
        ) : null}
      </Stack>
      <Divider />
      <Stack p="4px 0px 16px 16px" mt={1}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personalization
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Trends for you:</Typography>
          <Checkbox
            checked={checkedPersonalization}
            onChange={(e) => {
              setCheckedPersonalization(e.target.checked);
            }}
            sx={{
              width: "20px",
              height: "20px",
              mr: "14px",
              color: "#000",
              "&.Mui-checked": {
                color: "#1DA1F2",
              },
            }}
          />
        </Stack>
        <Typography variant="span" color="rgb(83, 100, 113)" fontSize="14px">
          You can personalize trends based on your location and who you follow.
        </Typography>
      </Stack>
    </Stack>
  );
};
