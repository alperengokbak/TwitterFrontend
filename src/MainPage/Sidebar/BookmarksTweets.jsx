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
import { PostComponentIcon } from "../Sidebar/TweetBoxAndPostIcons";
import { CurrentDateFormat } from "../Home/CurrentDateFormat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

function BookmarksTweets({
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
  user_id,
  isLiked,
  isRetweeted,
  handleDeletePost,
  handleLikePost,
  handleUnlikePost,
  handleRetweet,
  handleRemoveRetweet,
}) {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const [followInformation, setFollowInformation] = React.useState([]);
  const followed_user_id = user_id;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorElUpload, setAnchorElUpload] = React.useState(null);
  const openUpload = Boolean(anchorElUpload);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpload = (event) => {
    setAnchorElUpload(event.currentTarget);
  };

  const handleCloseUpload = () => {
    setAnchorElUpload(null);
  };

  const handleFollow = async (followed_user_id) => {
    const response = await axios.post(`http://localhost:3000/profile/follow`, {
      follower_user_id: user.id,
      followed_user_id: followed_user_id,
    });
    if (response.status === 200) {
      setFollowInformation((prevUserInformation) => ({
        ...prevUserInformation,
        following: true,
        followers: parseInt(prevUserInformation.followers + 1),
      }));
    } else {
      console.log("Error");
    }
  };

  const handleUnfollow = async (followed_user_id) => {
    const response = await axios.delete(
      `http://localhost:3000/profile/unfollow`,
      {
        data: {
          follower_user_id: user.id,
          followed_user_id: followed_user_id,
        },
      }
    );
    if (response.status === 200) {
      setFollowInformation((prevUserInformation) => ({
        ...prevUserInformation,
        following: false,
        followers: parseInt(prevUserInformation.followers - 1),
      }));
    } else {
      console.log("Error");
    }
  };

  return (
    <Stack>
      <Divider
        sx={{
          color: "gray",
        }}
      />
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
                  <PostComponentIcon
                    handleClickUpload={handleClickUpload}
                    text="Upload"
                    Icon={UploadIcon}
                  />
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
                Follow @{username}
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleUnfollow(followed_user_id);
                  handleClose();
                }}
              >
                Unfollow @{username}
              </MenuItem>
            )}
          </Stack>
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
      <Menu
        anchorEl={anchorElUpload}
        open={openUpload}
        onClose={handleCloseUpload}
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              location.protocol +
                "//" +
                location.host +
                "/" +
                username +
                "/status/" +
                id
            );
            handleCloseUpload();
          }}
        >
          Copy Link
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default BookmarksTweets;
