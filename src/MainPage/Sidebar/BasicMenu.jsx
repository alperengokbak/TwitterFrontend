import React, { useContext } from "react";
import { Box, Avatar, Typography, IconButton, Stack } from "@mui/material";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

export const BasicMenuForMobile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "5px",
          marginBottom: "5px",
        }}
      >
        <Tooltip title="Accounts">
          <IconButton onClick={handleClick} size="small">
            <Avatar src={user.profile_picture} sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            setUser(null);
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export const BasicMenu = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  return (
    <Stack direction="row" width="100%" maxWidth="240px" mr={5} mb={2.5}>
      <Stack
        direction="row"
        height="100%"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          cursor: "pointer",
          padding: "5px",
          "&:hover": {
            backgroundColor: "#E8F5FE",
            borderRadius: "20px",
          },
        }}
      >
        <Avatar src={user.profile_picture} />
        <Stack mr={6}>
          <Typography variant="body2" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2">@{user.username}</Typography>
        </Stack>
        <ExitToAppIcon
          aria-label="exit"
          onClick={() => {
            setUser(null);
            localStorage.removeItem("token");
            navigate("/login");
          }}
          sx={{
            borderRadius: "50%",
            color: "#000000",
          }}
        />
      </Stack>
    </Stack>
  );
};
