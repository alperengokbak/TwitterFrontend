import { createTheme } from "@mui/material/styles";

const colors = {
  black: "#000000",
  twitterBlue: "#1DA1F2",
  white: "#FFFFFF",
  spanGray: "rgb(83, 100, 113)",
};
export const SidebarTheme = createTheme({
  palette: {
    primary: {
      main: colors.black,
    },
    secondary: {
      main: colors.twitterBlue,
    },
    third: {
      main: colors.white,
    },
  },
  components: {
    MuiSvgIcon: {
      variants: [
        {
          props: { className: "msgSendBtn" },
          style: {
            ":disabled": {
              color: "#000",
            },
            height: "20px",
            cursor: "pointer",
          },
        },
        {
          props: { className: "profileBackButton" },
          style: {
            cursor: "pointer",
            color: "#000000",
            fontSize: "20px",
            marginLeft: "15px",
            "&:hover": {
              backgroundColor: "#E8F5FE",
              borderRadius: "20px",
            },
          },
        },
        {
          props: { className: "postBackButton" },
          style: {
            cursor: "pointer",
            color: "#000000",
            fontSize: "20px",
            marginLeft: "15px",
            "&:hover": {
              backgroundColor: "#E8F5FE",
              borderRadius: "20px",
            },
          },
        },
        {
          props: { className: "more_postScreen" },
          style: {
            cursor: "pointer",
            color: "#808080",
            fontSize: "22px",
            "&:hover": {
              backgroundColor: "#E8F5FE",
              borderRadius: "20px",
            },
          },
        },
        {
          props: { className: "" },
          style: {
            cursor: "pointer",
            color: "#808080",
            fontSize: "17px",
            "&:hover": {
              backgroundColor: "#E8F5FE",
              borderRadius: "20px",
            },
          },
        },
        {
          props: { className: "PostComponentIcon" },
          style: {
            cursor: "pointer",
            height: "20px",
            width: "20px",
            padding: "3px",
            color: "gray",
          },
        },
        {
          props: { className: "TweetBoxForPostIcon" },
          style: {
            cursor: "pointer",
            padding: "3px",
            height: "20px",
            width: "20px",
            color: colors.twitterBlue,
            "&:hover": {
              borderRadius: "20px",
              color: "#1DA1F2",
            },
          },
        },
        {
          props: { className: "TweetBoxIcon" },
          style: {
            cursor: "pointer",
            padding: "3px",
            height: "20px",
            width: "20px",
            color: colors.twitterBlue,
            "&:hover": {
              borderRadius: "20px",
              color: "#1DA1F2",
            },
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          fontSize: "1.15rem",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "&:not(.MuiInputAdornment-hiddenLabel)": {
            marginTop: "0px !important",
          },
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
        input: {
          padding: "9.5px 0px",
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { className: "profileIconButton" },
          style: {
            color: colors.black,
          },
        },
        {
          props: { "aria-label": "close" },
          style: {
            color: colors.black,
            backgroundColor: "rgba(15, 20, 25, 0.75)",
            position: "absolute",
            backdropFilter: "blur(4px)",
            height: "32px",
            width: "32px",
            outline: "none",
            top: "14px",
            right: "6px",
            transition:
              "background-color 0.2s ease-in-out,box-shadow 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(39, 44, 48, 0.75)",
            },
          },
        },
        {
          props: { "aria-label": "closeForPostScreen" },
          style: {
            color: colors.black,
            backgroundColor: "rgba(15, 20, 25, 0.75)",
            position: "absolute",
            backdropFilter: "blur(4px)",
            height: "32px",
            width: "32px",
            outline: "none",
            top: 8,
            right: 8,
            transition:
              "background-color 0.2s ease-in-out,box-shadow 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(39, 44, 48, 0.75)",
            },
          },
        },
        {
          props: { "aria-label": "SidebarIconsForMobile" },
          style: {
            fontSize: "27",
            padding: "6px",
            size: "10px",
            color: colors.black,
            "&:hover": {
              borderRadius: "20px",
            },
          },
        },
        {
          props: { "aria-label": "SidebarIcons" },
          style: {
            color: "#000000",
            fontSize: "15px",
            size: "10px",
          },
        },
        {
          props: { className: "sidebarSendBtn" },
          style: {
            color: "#1DA1F2",
            background: "#FFFFFF",
            border: "none",
            borderRadius: "50px",
            textTransform: "inherit",
            justifyContent: "flex-start",
            marginLeft: "10px",
            "&:hover": {
              color: "#000000",
            },
          },
        },
      ],
    },
    MuiAvatar: {
      variants: [
        {
          props: { className: "Profile Image" },
          style: {
            "&:hover": {
              cursor: "pointer",
              opacity: "0.8",
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { className: "newMessageBtn" },
          style: {
            color: colors.white,
            backgroundColor: colors.black,
            fontWeight: "bold",
            border: "none",
            boxShadow: "none",
            height: "35px",
            "&:hover": {
              backgroundColor: colors.white,
              color: colors.black,
            },
          },
        },
        {
          props: { className: "popoverButton" },
          style: {
            color: colors.twitterBlue,
            backgroundColor: colors.white,
            fontWeight: "400",
            border: "none",
            boxShadow: "none",
            height: "20px",
            "&:hover": {
              backgroundColor: colors.white,
            },
          },
        },
        {
          props: { className: "showMoreButton" },
          style: {
            color: colors.twitterBlue,
            borderRadius: "0px",
            fontWeight: "400",
          },
        },
        {
          props: { className: "subscribeToday" },
          style: {
            backgroundColor: "#000",
            color: "#FFF",
            marginBottom: "12px",
            height: "50px",
            "&:hover": {
              backgroundColor: "#000",
              opacity: "0.9",
            },
          },
        },
        {
          props: { className: "noThanks" },
          style: {
            backgroundColor: "#FFF",
            color: "#000",
            border: "1px solid #D3D3D3",
            height: "50px",
          },
        },
        {
          props: { className: "postScreen" },
          style: {
            borderRadius: "20px",
            backgroundColor: colors.twitterBlue,
            "&:hover": {
              backgroundColor: colors.twitterBlue,
              color: colors.white,
            },
          },
        },
        {
          props: { variant: "contained", fullWidth: true },
          style: {
            height: "50px",
            width: "230px",
            "&:hover": {
              backgroundColor: colors.twitterBlue,
              color: colors.white,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontWeight: "900",
          textTransform: "inherit",
          borderRadius: "20px",
        },
      },
    },
  },
});
