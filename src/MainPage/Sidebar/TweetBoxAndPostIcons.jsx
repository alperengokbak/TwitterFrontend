import { Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";

const colorPicker = (text, retweeted, type, retweets, bookmarked) => {
  if (type === "default") {
    if (text === "Retweet") {
      if (retweeted) {
        return "green";
      } else {
        return "gray";
      }
    } else if (text === "Like") {
      return "red";
    } else if (text === "Bookmark") {
      if (bookmarked) {
        return "rgba(29, 155, 240)";
      } else {
        return "gray";
      }
    } else {
      return "gray";
    }
  }
  if (type === "hover") {
    if (text === "Retweet") {
      if (retweets > 0) {
        return "green";
      }
      return "rgb(0, 186, 124)";
    } else if (text === "Like") {
      return "red";
    } else {
      return "rgb(29, 155, 240)";
    }
  }
  if (type === "background") {
    if (text === "Retweet") {
      if (retweets > 0) {
        return "rgb(0, 186, 124)";
      }
      return "#f1f8e9";
    } else if (text === "Like") {
      return "rgba(224, 36, 94, 0.1)";
    } else {
      return "rgba(29, 155, 240, 0.1)";
    }
  }
};
export const TweetBoxForPostIcon = ({ text, Icon }) => {
  return (
    <SvgIcon edge="end" aria-label={text} className="TweetBoxForPostIcon">
      <Icon />
    </SvgIcon>
  );
};

export const TweetBoxIcon = ({ text, Icon, handleOpen }) => {
  return (
    <SvgIcon
      title="media"
      aria-label={text}
      className="TweetBoxIcon"
      onClick={handleOpen}
    >
      <Icon />
    </SvgIcon>
  );
};

export const MessagesIcon = ({ text, Icon, handleOpen }) => {
  return (
    <SvgIcon
      title="media"
      aria-label={text}
      className="TweetBoxIcon"
      onClick={handleOpen}
    >
      <Icon />
    </SvgIcon>
  );
};

export const PostComponentIcon = ({
  text,
  Icon,
  likes,
  retweets,
  handleLikePost,
  handleRetweet,
  handleBookmark,
  handleClickUpload,
  retweeted,
  bookmarked,
}) => {
  return (
    <Stack flexDirection="row">
      <SvgIcon
        onClick={(event) => {
          if (text === "Retweet") {
            handleRetweet();
          }
          if (text === "Like") {
            handleLikePost();
          }
          if (text === "Bookmark") {
            handleBookmark();
          }
          if (text === "Upload") {
            handleClickUpload(event);
          }
          event.stopPropagation();
        }}
        sx={{
          color: colorPicker(text, retweeted, "default", retweets, bookmarked),
          "&:hover": {
            color: colorPicker(text, retweeted, "hover", retweets),
            backgroundColor: colorPicker(text, retweeted, "background"),
            borderRadius: "50%",
          },
        }}
        aria-label={text}
        className="PostComponentIcon"
      >
        <Icon />
      </SvgIcon>
      <Typography
        sx={{
          paddingTop: "5px",
          fontSize: "14px",
          color: "gray",
          cursor: "pointer",
          ":&hover": {
            color: "rgb(255,0,0)",
          },
        }}
        variant="span"
        component="span"
      >
        {likes}
      </Typography>
      <Typography
        className="retweet"
        color="#808080"
        sx={{
          paddingTop: "5px",
          fontSize: "14px",
          transition: `color 0.2s`,
          cursor: "pointer",
          ":&hover": {
            color: "#17BF63",
          },
        }}
        variant="span"
      >
        {retweets}
      </Typography>
    </Stack>
  );
};

export const CommentComponentIcon = ({
  text,
  Icon,
  likes,
  retweets,
  retweeted,
  handleLikeComment,
  handleRetweetComment,
  handleClickUpload,
}) => {
  return (
    <Stack flexDirection="row">
      <SvgIcon
        onClick={(event) => {
          if (text === "Retweet") {
            handleRetweetComment();
          } else if (text === "Like") {
            handleLikeComment();
          } else if (text === "Bookmark") {
          } else if (text === "Upload") {
            handleClickUpload(event);
          }
          event.stopPropagation();
        }}
        sx={{
          color: colorPicker(text, retweeted, "default", retweets),
          "&:hover": {
            color: colorPicker(text, retweeted, "hover", retweets),
            backgroundColor: colorPicker(text, retweeted, "background"),
            borderRadius: "50%",
          },
        }}
        aria-label={text}
        className="PostComponentIcon"
      >
        <Icon />
      </SvgIcon>
      <Typography
        sx={{
          paddingTop: "5px",
          fontSize: "14px",
          color: "gray",
          cursor: "pointer",
          ":&hover": {
            color: "rgb(255,0,0)",
          },
        }}
        variant="span"
        component="span"
      >
        {likes}
      </Typography>
      <Typography
        className="retweet"
        color="#808080"
        sx={{
          paddingTop: "5px",
          fontSize: "14px",
          transition: `color 0.2s`,
          cursor: "pointer",
          ":&hover": {
            color: "#17BF63",
          },
        }}
        variant="span"
      >
        {retweets}
      </Typography>
    </Stack>
  );
};
