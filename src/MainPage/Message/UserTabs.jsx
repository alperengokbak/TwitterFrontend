import React from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Modal,
  SvgIcon,
  Fab,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CreateConversation } from "./CreateConversation";

export const UserTabs = ({ userTabsInfo, setHideMessagePage, isDesktop }) => {
  const [inputSearch, setInputSearch] = React.useState("");
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  const [openConversation, setOpenConversation] = React.useState(false);
  const handleStartConversation = () => setOpenConversation(true);
  const handleCloseConversation = () => setOpenConversation(false);

  const handleButtonClick = () => {
    setIsActiveButton(!isActiveButton);
  };

  return (
    <Stack width={!isDesktop ? "90%" : "45%"}>
      <Stack
        direction="row"
        justifyContent="space-between"
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
              cursor: "pointer",
            }}
          />
          <SvgIcon
            sx={{
              cursor: "pointer",
              fontSize: "20px",
              p: 1,
              backgroundColor: "rgb(239, 243, 244)",
              borderRadius: "50%",
            }}
          >
            <AttachEmailOutlinedIcon onClick={handleStartConversation} />
          </SvgIcon>
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
              <SearchOutlinedIcon
                sx={{
                  height: "20px",
                  width: "20px",
                }}
              />
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
        onClick={() => {
          handleButtonClick();
          setHideMessagePage(false);
        }}
        sx={{
          height: "55px",
          cursor: "pointer",
          p: "8px 0px 8px 12px",
          backgroundColor: isActiveButton ? "rgb(239, 243, 244)" : null,
          borderRight: isActiveButton ? "2px solid #1DA1F2" : null,
          ":hover": {
            backgroundColor: isActiveButton ? "rgba(29, 161, 242, 0.1)" : null,
          },
        }}
      >
        <Avatar src={userTabsInfo.profile_picture} />
        <Stack ml={1.5}>
          <Stack direction="row" alignItems="center">
            <Typography>
              {userTabsInfo.firstname} {userTabsInfo.lastname}
            </Typography>
            <Typography variant="span" color="gray" ml={0.5}>
              @{userTabsInfo.username} · 1h
            </Typography>
          </Stack>
          <Typography>Follows you</Typography>
        </Stack>
      </Stack>
      <Modal open={openConversation} onClose={handleCloseConversation}>
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "65dvw",
            height: "65dvh",
            bgcolor: "background.paper",
            p: 1.5,
            border: "none",
            borderRadius: "15px",
          }}
        >
          <CreateConversation
            handleCloseConversation={handleCloseConversation}
          />
        </Stack>
      </Modal>
    </Stack>
  );
};
