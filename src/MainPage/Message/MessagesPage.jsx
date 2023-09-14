import React from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { MessagesIcon } from "../Sidebar/TweetBoxAndPostIcons";

export const MessagesPage = () => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [input, setInput] = React.useState("");
  const sendMessage = () => {};
  return (
    <Stack width={!isDesktop ? "85%" : "100%"}>
      <Stack
        direction="row"
        justifyItems="space-between"
        justifyContent="space-between"
        width="100%"
        p="14px 0px 0px 14px"
        height="38px"
        position="sticky"
      >
        <Stack direction="row" alignItems="center">
          {!isDesktop ? (
            <ArrowBackIcon
              onClick={() => {
                window.history.back();
              }}
              sx={{
                cursor: "pointer",
                height: "20px",
                width: "20px",
                mr: 5,
              }}
            />
          ) : null}
          <Typography variant="body1" fontWeight="bold">
            Username
          </Typography>
        </Stack>
        <InfoOutlinedIcon
          sx={{
            mr: 3,
            height: "20px",
            width: "20px",
          }}
        />
      </Stack>
      <Stack
        alignItems="center"
        maxHeight="calc(100vh - 38px)"
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          width="100%"
          height="310px"
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgb(239, 243, 244)",
            },
          }}
        >
          <Stack alignItems="center" p={2}>
            <Avatar
              sx={{
                height: "60px",
                width: "60px",
              }}
            />
            <Stack>
              <Typography variant="body2" fontWeight="bold" textAlign="center">
                Full Name
              </Typography>
              <Typography variant="span" color="gray">
                @Username
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                mb: 1,
              }}
            >
              BIO
            </Typography>
            <Typography
              variant="span"
              color="rgb(83, 100, 113)"
              fontSize="15px"
              mb={1}
            >
              Creation Date - followers
            </Typography>
            <Typography
              variant="span"
              color="rgb(83, 100, 113)"
              fontSize="15px"
            >
              Not followed by anyone you're following
            </Typography>
          </Stack>
        </Stack>

        <Stack
          width="100%"
          maxHeight="57vh"
          height="57vh"
          borderTop="1px solid rgb(239, 243, 244)"
        >
          <h4>Messages</h4>
        </Stack>
      </Stack>
      <TextField
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        sx={{
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
                onClick={sendMessage}
              >
                <SendIcon className="msgSendBtn" />
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
  );
};
