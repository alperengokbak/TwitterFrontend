import * as React from "react";
import { Avatar, Stack, Typography, Paper, Grid, Divider } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Verified from "@mui/icons-material/Verified";
import RepeatIcon from "@mui/icons-material/Repeat";
import UploadIcon from "@mui/icons-material/Upload";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CommentComponentIcon } from "../Sidebar/TweetBoxAndPostIcons";
import { CurrentDateFormat } from "../Home/CurrentDateFormat";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

function Comments({
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
  handleLikeComment,
  handleUnlikeComment,
  handleRetweetComment,
  handleRemoveRetweetComment,
  handleDeleteComment,
  handleFollow,
  handleUnfollow,
  followInformation,
  followed_user_id,
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
    <Stack>
      <Paper
        onClick={() => {
          navigate(`/${username}/status/${id}`);
        }}
        sx={{
          padding: "16px 0px 16px 16px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#F7F9FA",
          },
        }}
      >
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
            <Grid container direction="column" spacing={1.5} width="100%">
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
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop="10px"
                  width="100%"
                >
                  <CommentComponentIcon
                    text="Reply"
                    Icon={ChatBubbleOutlineIcon}
                  />
                  <CommentComponentIcon
                    text="Retweet"
                    Icon={RepeatIcon}
                    retweets={retweets}
                    handleRetweetComment={() => {
                      if (isRetweeted) {
                        handleRemoveRetweetComment(id);
                      } else {
                        handleRetweetComment(id);
                      }
                    }}
                  />
                  <CommentComponentIcon
                    text="Like"
                    Icon={isLiked ? FavoriteIcon : FavoriteBorderIcon}
                    likes={likes}
                    handleLikeComment={() => {
                      if (isLiked) {
                        handleUnlikeComment(id);
                      } else {
                        handleLikeComment(id);
                      }
                    }}
                  />
                  <CommentComponentIcon text="View" Icon={BarChartIcon} />
                  <CommentComponentIcon text="Upload" Icon={UploadIcon} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user.username !== username ? (
          <Stack>
            <MenuItem onClick={handleClose}>
              Not interested in this post
            </MenuItem>
            {!followInformation.following ? (
              <MenuItem
                onClick={() => {
                  handleFollow(followed_user_id);
                  handleClose();
                }}
              >
                Follow @{user.username}
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleUnfollow(followed_user_id);
                  handleClose();
                }}
              >
                Unfollow @{user.username}
              </MenuItem>
            )}
          </Stack>
        ) : (
          <MenuItem
            onClick={() => {
              handleDeleteComment(id);
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

export default Comments;
