import React from "react";
import { Stack, Modal, Box } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { SidebarOptions } from "./SidebarOption";
import { BasicMenu, BasicMenuForMobile } from "./BasicMenu";
import { PostScreen } from "./PostScreen";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import { Verified } from "./Verified";

export const Sidebar = () => {
  const { isDesktop, user } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //  TODO - Sidebar'ı düzelt.
  //  TODO - Mesajlar kısmını düzelt.
  //  TODO - Layout component'ini ayarla.

  return (
    <Stack
      height="100vh"
      borderRight="2px solid #e6ecf0"
      alignItems="flex-end"
      justifyContent="space-between"
      justifyItems="space-between"
    >
      <Stack
        sx={{
          marginTop: "10px",
          paddingRight: isDesktop ? "40px" : null,
        }}
      >
        <TwitterIcon
          sx={{
            color: "#1DA1F2",
            fontSize: "30px",
            marginLeft: "14px",
            marginBottom: "8px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#E8F5FE",
              borderRadius: "50%",
            },
          }}
          onClick={() => {
            window.location.href = "/home";
          }}
        />
        <SidebarOptions Icon={HomeOutlinedIcon} text="Home" link="/home" />
        <SidebarOptions Icon={SearchIcon} text="Explore" link="/explore" />
        <SidebarOptions
          Icon={NotificationsNoneIcon}
          text="Notifications"
          link="#"
        />
        <SidebarOptions
          Icon={MailOutlineIcon}
          text="Messages"
          link="/messages"
        />
        <SidebarOptions Icon={ListAltIcon} text="Lists" link="#" />
        <SidebarOptions
          Icon={BookmarkBorderIcon}
          text="Bookmarks"
          link={`/i/bookmarks`}
        />
        <SidebarOptions
          Icon={GroupOutlinedIcon}
          text="Communities"
          link={`/${user.username}/communities`}
        />
        <SidebarOptions
          Icon={VerifiedOutlinedIcon}
          text="Verified"
          onClick={handleOpen}
          link={window.location.pathname}
        />
        <SidebarOptions
          Icon={PermIdentityIcon}
          text="Profile"
          link={`/${user.username}`}
        />
        <SidebarOptions Icon={MoreHorizIcon} text="More" link="#" />
        <PostScreen />
      </Stack>
      {isDesktop ? <BasicMenu /> : <BasicMenuForMobile />}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "390px",
            bgcolor: "background.paper",
            p: 8,
            borderRadius: "20px",
            boxShadow: 24,
          }}
        >
          <Verified id={user.id} handleClose={handleClose} />
        </Box>
      </Modal>
    </Stack>
  );
};
