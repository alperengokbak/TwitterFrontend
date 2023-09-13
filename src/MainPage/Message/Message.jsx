import React from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendIcon from "@mui/icons-material/Send";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { MessagesIcon } from "../Sidebar/TweetBoxAndPostIcons";

export const Message = () => {
  const [input, setInput] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const sendMessage = () => {};
  return (
    <Stack direction="row" height="100vh">
      <Stack width="48%">
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
      <Divider
        sx={{
          borderLeft: "1px solid rgb(239, 243, 244)",
        }}
        orientation="vertical"
        flexItem
      />
      <Stack width="65%">
        <Stack
          direction="row"
          justifyItems="space-between"
          justifyContent="space-between"
          width="97%"
          p="14px 0px 0px 14px"
        >
          <Typography variant="body1" fontWeight="bold">
            Anon
          </Typography>
          <InfoOutlinedIcon
            sx={{
              mr: "14px",
              height: "20px",
              width: "20px",
            }}
          />
        </Stack>
        <TextField
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          sx={{
            width: "80%",
            m: "6px 10px 0px 10px",
          }}
          placeholder="Start a new message"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width="100px"
                  mr={2}
                >
                  <MessagesIcon
                    text="ImageOutlinedIcon"
                    Icon={ImageOutlinedIcon}
                  />
                  <MessagesIcon
                    text="GifBoxOutlinedIcon"
                    Icon={GifBoxOutlinedIcon}
                  />
                  <MessagesIcon
                    text="EmojiEmotionsOutlinedIcon"
                    Icon={EmojiEmotionsOutlinedIcon}
                  />
                </Stack>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  disabled={!input}
                  sx={{
                    color: "rgb(29, 155, 240)",
                    "&:hover": {
                      backgroundColor: "rgba(29, 155, 240, 0.1)",
                    },
                  }}
                >
                  <SendIcon className="msgSendBtn" onClick={sendMessage} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              height: "45px",
              borderRadius: "20px",
              backgroundColor: "rgb(239, 243, 244)",
            },
          }}
        />
      </Stack>
      <Divider
        sx={{
          borderLeft: "1px solid rgb(239, 243, 244)",
        }}
        orientation="vertical"
        flexItem
      />
    </Stack>
  );
};
