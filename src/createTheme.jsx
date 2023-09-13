import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#000000",
  secondary: "#1DA1F2",
  third: "#FFFFFF",
};
export const SidebarTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    third: {
      main: colors.third,
    },
  },
  components: {
    MuiSvgIcon: {
      variants: [
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
            color: colors.secondary,
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
            color: colors.secondary,
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
            color: colors.primary,
          },
        },
        {
          props: { "aria-label": "close" },
          style: {
            color: colors.primary,
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
            color: colors.primary,
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
            color: colors.primary,
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
          props: { "aria-label": "send" },
          style: {
            color: "#1DA1F2",
            background: "#FFFFFF",
            border: "none",
            borderRadius: "50px",
            textTransform: "inherit",
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
          props: { className: "popoverButton" },
          style: {
            color: colors.secondary,
            backgroundColor: colors.third,
            fontWeight: "400",
            border: "none",
            boxShadow: "none",
            height: "20px",
            "&:hover": {
              backgroundColor: colors.third,
            },
          },
        },
        {
          props: { className: "showMoreButton" },
          style: {
            color: colors.secondary,
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
            backgroundColor: colors.secondary,
            "&:hover": {
              backgroundColor: colors.secondary,
              color: colors.third,
            },
          },
        },
        {
          props: { variant: "contained", fullWidth: true },
          style: {
            height: "50px",
            width: "230px",
            "&:hover": {
              backgroundColor: colors.secondary,
              color: colors.third,
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
