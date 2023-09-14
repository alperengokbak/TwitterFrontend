import React from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const UserTabs = () => {
  const [inputSearch, setInputSearch] = React.useState("");
  return (
    <Stack width="70%">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        p="10px 0px 0px 14px"
        mb={2.5}
      >
        <Typography variant="h6" fontWeight="bold">
          Messages
        </Typography>
        <Stack direction="row" spacing={1.5} mr={2}>
          <SettingsOutlinedIcon
            sx={{
              height: "20px",
              width: "20px",
            }}
          />
          <AttachEmailOutlinedIcon
            sx={{
              height: "20px",
              width: "20px",
            }}
          />
        </Stack>
      </Stack>
      <TextField
        placeholder="Search Direct Messages"
        value={inputSearch}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        sx={{
          m: "0px 10px 10px 10px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100px"
                mr={2}
              >
                <SearchOutlinedIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              </Stack>
            </InputAdornment>
          ),
          sx: {
            height: "45px",
            borderRadius: "30px",
          },
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "55px",
          cursor: "pointer",
          p: "8px 0px 8px 12px",
          backgroundColor: "rgb(239, 243, 244)",
          borderRight: "2px solid #1DA1F2",
        }}
      >
        <Avatar />
        <Stack ml={1.5}>
          <Stack direction="row" alignItems="center">
            <Typography>Anonymous</Typography>
            <Typography variant="span" color="gray" ml={0.5}>
              @MacosTen_1990 · 1h
            </Typography>
          </Stack>
          <Typography>Follows you</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
