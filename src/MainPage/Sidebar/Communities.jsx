import React from "react";
import { Grid, Stack, SvgIcon, Typography, Modal, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { CommunitiesGetVerified } from "./CommunitiesGetVerified";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

export const Communities = () => {
  const { user } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid
      flexDirection="row"
      height="100vh"
      overflow="scroll"
      minWidth="fit-content"
      webkitoverflowscrolling="touch"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Grid item position="sticky" mt={1}>
        <Stack flexDirection="row" alignItems="center" height="40px">
          <SvgIcon
            className="postBackButton"
            onClick={() => {
              window.history.back();
            }}
            sx={{
              ml: 2,
            }}
          >
            <ArrowBackIcon />
          </SvgIcon>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            ml={4}
            width="100%"
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Communities
            </Typography>
            <Stack flexDirection="row" alignItems="center" mr={2}>
              <SvgIcon
                style={{
                  cursor: "pointer",
                }}
              >
                <SearchIcon />
              </SvgIcon>
              <SvgIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={handleOpen}
                sx={{
                  ml: 2,
                }}
              >
                <GroupAddOutlinedIcon />
              </SvgIcon>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          mt={5}
          justifyContent="center"
          justifyItems="center"
          padding="0px 120px 0px 120px"
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: "34px",
              wordWrap: "break-word",
            }}
          >
            You haven't joined any Communities yet
          </Typography>
          <Typography variant="span" color="gray" fontSize="18px">
            When you do, you'll see their posts here.
          </Typography>
        </Stack>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "250px",
            bgcolor: "background.paper",
            p: 8,
            borderRadius: "15px",
            boxShadow: 24,
          }}
        >
          <CommunitiesGetVerified id={user.id} handleClose={handleClose} />
        </Box>
      </Modal>
    </Grid>
  );
};
