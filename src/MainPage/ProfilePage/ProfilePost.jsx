import React from "react";
import {
  Avatar,
  Stack,
  Typography,
  Paper,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Verified from "@mui/icons-material/Verified";
import RepeatIcon from "@mui/icons-material/Repeat";
import UploadIcon from "@mui/icons-material/Upload";
import BarChartIcon from "@mui/icons-material/BarChart";
import { PostComponentIcon } from "../Sidebar/TweetBoxAndPostIcons";
import { CurrentDateFormat } from "../Home/CurrentDateFormat";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

function ProfilePost({
  firstName,
  lastName,
  username,
  is_verified,
  creation_date,
  likes,
  retweets,
  content,
  profile_picture,
  image_url,
  id,
  isLiked,
  isRetweeted,
  handleDeletePost,
  handleLikePost,
  handleUnlikePost,
  handleRetweet,
  handleRemoveRetweet,
  userRetweetedUsername,
  retweeter_username,
}) {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        borderBottom: "1px solid #e6ecf0",
      }}
    >
      <Paper
        onClick={() => {
          navigate(`/${username}/status/${id}`);
        }}
        sx={{
          cursor: "pointer",
          padding: isRetweeted ? "8px 0px 16px 16px" : "16px 0px 16px 16px",
        }}
      >
        {isRetweeted ? (
          <Stack flexDirection="row" ml={3} mb={1} alignItems="center">
            <RepeatIcon
              sx={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
                marginRight: "12px",
              }}
            />
            <Typography
              variant="body2"
              component="span"
              sx={{
                color: "gray",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {userRetweetedUsername} {retweeter_username} Retweeted
            </Typography>
          </Stack>
        ) : null}
        <Grid container spacing={1.3}>
          <Grid item>
            <Avatar
              className="Profile Image"
              alt="Profile Image"
              src={profile_picture}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/${username}`);
              }}
            />
          </Grid>
          <Grid item xs>
            <Grid container width="100%" direction="column" spacing={1.5}>
              <Grid item>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Stack flexDirection="row">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/${username}`);
                      }}
                    >
                      {firstName} {lastName}
                      {is_verified ? (
                        <Verified
                          sx={{
                            marginLeft: "5px",
                            color: "#1DA1F2",
                            width: "15px",
                            height: "15px",
                            cursor: "pointer",
                          }}
                        />
                      ) : null}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      alignItems="center"
                      sx={{
                        color: "gray",
                        fontSize: "14px",
                        fontWeight: "400",
                        cursor: "pointer",
                        marginLeft: is_verified ? "1px" : "5px",
                        marginRight: "1vw",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/${username}`);
                      }}
                    >
                      @{username} · {CurrentDateFormat(creation_date)}
                    </Typography>
                  </Stack>
                  <Stack>
                    <MoreHorizIcon
                      sx={{
                        marginLeft: "9vw",
                      }}
                      className="more_postScreen"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClick(event);
                      }}
                    />
                  </Stack>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 1,
                    fontSize: "15px",
                  }}
                >
                  {content}
                </Typography>
                {image_url && (
                  <Stack direction="column" justifyItems="flex-start">
                    <img
                      alt="Post"
                      style={{
                        borderRadius: "16px",
                        marginTop: "15px",
                        maxHeight: "55vh",
                        height: "100%",
                        maxWidth: "55vw",
                        width: "100%",
                      }}
                      src={image_url}
                    />
                  </Stack>
                )}
              </Grid>
              <Grid item>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop="10px"
                  width="100%"
                >
                  <PostComponentIcon
                    text="Reply"
                    Icon={ChatBubbleOutlineIcon}
                  />
                  <PostComponentIcon
                    text="Retweet"
                    Icon={RepeatIcon}
                    retweets={retweets}
                    handleRetweet={() => {
                      if (isRetweeted) {
                        handleRemoveRetweet(id);
                      } else {
                        handleRetweet(id);
                      }
                    }}
                  />
                  <PostComponentIcon
                    text="Like"
                    Icon={isLiked ? FavoriteIcon : FavoriteBorderIcon}
                    likes={likes}
                    handleLikePost={() => {
                      if (isLiked) {
                        handleUnlikePost(id);
                      } else {
                        handleLikePost(id);
                      }
                    }}
                  />
                  <PostComponentIcon text="View" Icon={BarChartIcon} />
                  <PostComponentIcon text="Upload" Icon={UploadIcon} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user.username !== username ? (
          <MenuItem onClick={handleClose}>Not interested in this post</MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleDeletePost(id);
              handleClose();
            }}
          >
            Delete this post
          </MenuItem>
        )}
      </Menu>
    </Stack>
  );
}

export default ProfilePost;
