import {
  Grid,
  Stack,
  SvgIcon,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  TextField,
  IconButton,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Verified from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import UploadIcon from "@mui/icons-material/Upload";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifIcon from "@mui/icons-material/Gif";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { TweetBoxIcon } from "../Sidebar/TweetBoxAndPostIcons";
import React from "react";
import axios from "axios";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import { PostComponentIcon } from "../Sidebar/TweetBoxAndPostIcons";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const CommentScreen = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorElUpload, setAnchorElUpload] = React.useState(null);
  const openUpload = Boolean(anchorElUpload);

  const { id, username } = useParams();
  const { user } = React.useContext(AuthContext);
  const [post, setPost] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [replyMessage, setReplyMessage] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);
  const [followInformation, setFollowInformation] = React.useState([]);
  const followed_user_id = post.user_id;

  const creationDate = new Date(post.creation_date).toDateString();
  const creationDateHours = new Date(post.creation_date).toLocaleTimeString();

  const fileInputRef = React.useRef(null);

  const colorGray = "rgb(83, 100, 113)";

  const postComments = async (imageUrl, tweet) => {
    try {
      const response = await axios.post("http://localhost:3000/tweet/comment", {
        user_id: user.id,
        content: tweet,
        image_url: imageUrl,
        mother_tweet_id: id,
      });
      if (response.status === 201) {
        console.log("Tweet posted successfully!");
        setComments((prevPosts) => [response.data, ...prevPosts]);
      } else {
        console.error("Failed to post tweet");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCommentScreen = async () => {
    const response = await axios.get(`http://localhost:3000/tweet/${id}`);
    if (response.status === 200) {
      const jsonData = await response.data;
      setComments(jsonData.comments);
      setPost(jsonData.mainTweet);
    } else {
      console.error("Failed to fetch data");
    }
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

  const handleAddBookmark = async () => {
    await axios
      .post(`http://localhost:3000/tweet/addbookmark`, {
        user_id: user.id,
        tweet_id: post.id,
      })
      .then((res) => {
        setPost((tweet) => {
          if (tweet.id === post.id) {
            return {
              ...tweet,
              bookmarkscount: res.data.bookmarkscount,
              bookmarked: true,
            };
          }
          return tweet;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteBookmark = async () => {
    await axios
      .delete(`http://localhost:3000/tweet/deletebookmark`, {
        data: {
          user_id: user.id,
          tweet_id: post.id,
        },
      })
      .then((res) => {
        setPost((tweet) => {
          if (tweet.id === post.id) {
            return {
              ...tweet,
              bookmarkscount: res.data.bookmarkscount,
              bookmarked: false,
            };
          }
          return tweet;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tweet/${id}/`);
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tweet/${id}/`);
      if (response.status === 200) {
        setComments((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLike = async (id) => {
    await axios
      .post(`http://localhost:3000/tweet/like`, {
        user_id: user.id,
        tweet_id: id,
      })
      .then((res) => {
        setPost((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              likes: res.data.likes,
              liked: true,
            };
          }
          return tweet;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeComment = async (id) => {
    await axios
      .post(`http://localhost:3000/tweet/like`, {
        user_id: user.id,
        tweet_id: id,
      })
      .then((res) => {
        setComments((prevPosts) =>
          prevPosts.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                likes: res.data.likes,
                liked: true,
              };
            }
            return comment;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (id) => {
    await axios
      .delete(`http://localhost:3000/tweet/unlike`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        setPost((posts) => {
          if (posts.id === id) {
            return {
              ...posts,
              likes: res.data.likes,
              liked: false,
            };
          }
          return posts;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlikeComment = async (id) => {
    await axios
      .delete(`http://localhost:3000/tweet/unlike`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        setComments((prevPosts) =>
          prevPosts.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                likes: res.data.likes,
                liked: false,
              };
            }
            return comment;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRetweet = async (id) => {
    await axios
      .post(`http://localhost:3000/tweet/retweet`, {
        user_id: user.id,
        tweet_id: id,
      })
      .then((res) => {
        setPost((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              retweets: res.data.retweets,
              retweeted: true,
            };
          }
          return tweet;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRetweetComment = async (id) => {
    await axios
      .post(`http://localhost:3000/tweet/retweet`, {
        user_id: user.id,
        tweet_id: id,
      })
      .then((res) => {
        setComments((prevPosts) =>
          prevPosts.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                retweets: res.data.retweets,
                retweeted: true,
              };
            }
            return comment;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveRetweet = async (id) => {
    await axios
      .delete(`http://localhost:3000/tweet/undoretweet`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        setPost((posts) => {
          if (posts.id === id) {
            return {
              ...posts,
              retweets: res.data.retweets,
              retweeted: false,
            };
          }
          return posts;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveRetweetComment = async (id) => {
    await axios
      .delete(`http://localhost:3000/tweet/undoretweet`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        setComments((prevPosts) =>
          prevPosts.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                retweets: res.data.retweets,
                retweeted: false,
              };
            }
            return comment;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", "rdasu5f6");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsruzqnhp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const uploadedImageUrl = data.secure_url;
        return uploadedImageUrl;
      } else {
        console.error(
          "Cloudinary background upload failed:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Cloudinary background upload error:", error);
    }
  };

  const handleClearImage = () => {
    fileInputRef.current.value = "";
    setReplyMessage("");
    setImageUrl("");
    setPreviewImage(null);
  };

  const handlePostComments = async (e) => {
    e.preventDefault();
    let uploadCloudinaryUrl = await handleFileSelected();

    if (imageUrl) {
      postComments(uploadCloudinaryUrl, replyMessage);
      handleClearImage();
    } else {
      postComments("", replyMessage);
      handleClearImage();
    }
  };

  React.useEffect(() => {
    if (imageUrl) {
      setPreviewImage(URL.createObjectURL(imageUrl));
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  React.useEffect(() => {
    handleCommentScreen();
  }, [id]);

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
          <Stack flexDirection="row" justifyItems="flex-start" ml={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Post
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        maxHeight="calc(100vh - 58px)"
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack ml={2} mt={3}>
          <Stack flexDirection="row">
            <Avatar
              src={post.profile_picture}
              onClick={() => {
                navigate(`/${username}`);
              }}
              sx={{
                cursor: "pointer",
              }}
            />
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
              sx={{
                mr: 2,
              }}
            >
              <Stack ml={1.5}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  onClick={() => {
                    navigate(`/${username}`);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {post.firstname} {post.lastname}
                  {post.is_verified ? (
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
                  color={colorGray}
                  onClick={() => {
                    navigate(`/${username}`);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  @{post.username}
                </Typography>
              </Stack>
              <Stack>
                <MoreHorizIcon
                  className="more_postScreen"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack mt={2}>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {post.content}
            </Typography>
            {post.image_url && (
              <Stack direction="column" justifyItems="flex-start">
                <img
                  alt="Post"
                  style={{
                    borderRadius: "16px",
                    marginTop: "15px",
                    maxHeight: "55vh",
                    height: "100%",
                    maxWidth: "575px",
                    width: "100%",
                  }}
                  src={post.image_url}
                />
              </Stack>
            )}
          </Stack>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: { colorGray },
              fontSize: "15px",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {creationDateHours} · {creationDate} · 65K Views
          </Typography>
          <Divider
            sx={{
              mt: 2,
              mb: 2,
              maxWidth: "575px",
            }}
          />
          <Stack flexDirection="row" alignContent="center">
            <Stack flexDirection="row">
              <Typography
                variant="body2"
                color="#000"
                mr={0.5}
                sx={{
                  cursor: "pointer",
                }}
              >
                {post.retweets}
              </Typography>
              <Typography
                variant="body2"
                color={colorGray}
                mr={1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Retweets
              </Typography>
            </Stack>
            <Stack flexDirection="row">
              <Typography
                variant="body2"
                mr={0.5}
                color="#000"
                sx={{
                  cursor: "pointer",
                }}
              >
                {post.likes}
              </Typography>
              <Typography
                variant="body2"
                color={colorGray}
                mr={1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Likes
              </Typography>
            </Stack>
            <Stack flexDirection="row">
              <Typography
                variant="body2"
                mr={0.5}
                color="#000"
                sx={{
                  cursor: "pointer",
                }}
              >
                {post.bookmarkscount}
              </Typography>
              <Typography
                variant="body2"
                color={colorGray}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Bookmarks
              </Typography>
            </Stack>
          </Stack>
          <Divider
            sx={{
              mt: 2,
              mb: 2,
              maxWidth: "575px",
            }}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            width="100%"
            maxWidth="575px"
          >
            <PostComponentIcon text="Reply" Icon={ChatBubbleOutlineIcon} />
            <PostComponentIcon
              text="Retweet"
              Icon={RepeatIcon}
              retweeted={post.retweeted}
              handleRetweet={() => {
                if (post.retweeted) {
                  handleRemoveRetweet(post.id);
                } else {
                  handleRetweet(post.id);
                }
              }}
            />
            <PostComponentIcon
              text="Like"
              Icon={post.liked ? FavoriteIcon : FavoriteBorderIcon}
              handleLikePost={() => {
                if (post.liked) {
                  handleUnlike(post.id);
                } else {
                  handleLike(post.id);
                }
              }}
            />
            <PostComponentIcon
              text="Bookmark"
              Icon={post.bookmarked ? BookmarkIcon : BookmarkBorderIcon}
              bookmarked={post.bookmarked}
              handleBookmark={() => {
                if (post.bookmarked) {
                  handleDeleteBookmark();
                } else {
                  handleAddBookmark();
                }
              }}
            />
            <PostComponentIcon
              handleClickUpload={(event) => {
                handleClickUpload(event);
              }}
              text="Upload"
              Icon={UploadIcon}
            />
          </Stack>
          <Divider
            sx={{
              mt: 2,
              mb: 2,
              maxWidth: "575px",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: { colorGray },
              cursor: "pointer",
              fontSize: "15px",
              mb: 2,
              ml: 6,
            }}
          >
            Repyling to @{post.username}
          </Typography>
          <Stack flexDirection="row" width="100%" maxWidth="575px">
            <Avatar
              src={user.profile_picture}
              onClick={() => {
                navigate(`/${user.username}`);
              }}
              sx={{
                cursor: "pointer",
              }}
            />
            <Stack ml={1.5} width="100%">
              <TextField
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="Post your reply!"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                multiline
                fullWidth
              />
              {previewImage ? (
                <Stack
                  position={"relative"}
                  display={"inline-block"}
                  alignItems="flex-start"
                  marginLeft={1}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      marginTop: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={previewImage || ""}
                      alt="Image"
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                    <IconButton aria-label="close" onClick={handleClearImage}>
                      <CloseIcon
                        sx={{
                          height: "20px",
                          width: "20px",
                          color: "#FFFFFF",
                        }}
                      />
                    </IconButton>
                  </Card>
                </Stack>
              ) : (
                ""
              )}
              <Stack flexDirection="row" alignContent="center">
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  maxWidth="200px"
                  mt={4}
                >
                  <TweetBoxIcon
                    handleOpen={handleFileUpload}
                    text="ImageOutlinedIcon"
                    Icon={ImageOutlinedIcon}
                  />
                  <TweetBoxIcon text="GifIcon" Icon={GifIcon} />
                  <TweetBoxIcon
                    text="PollOutlinedIcon"
                    Icon={PollOutlinedIcon}
                  />
                  <TweetBoxIcon text="MoodIcon" Icon={MoodIcon} />
                  <TweetBoxIcon text="ScheduleIcon" Icon={ScheduleIcon} />
                </Stack>
                <Stack
                  flexDirection="row"
                  width="100%"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    variant="contained"
                    disabled={!replyMessage && !imageUrl}
                    onClick={handlePostComments}
                    sx={{
                      height: "35px",
                      width: "40px",
                      borderRadius: "30px",
                      backgroundColor: "#1DA1F2",
                      color: "#FFFFFF",
                    }}
                  >
                    Reply
                  </Button>
                </Stack>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      setImageUrl(event.target.files[0]);
                    }
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider
          sx={{
            mt: 2,
          }}
        />
        {comments ? (
          <Stack>
            {comments.map((comment) => (
              <Comments
                key={comment.id}
                firstName={comment.firstname}
                lastName={comment.lastname}
                username={comment.username}
                is_verified={comment.is_verified}
                creation_date={comment.creation_date}
                content={comment.content}
                profile_picture={comment.profile_picture}
                likes={comment.likes}
                retweets={comment.retweets}
                image_url={comment.image_url}
                id={comment.id}
                isLiked={comment.liked}
                isRetweeted={comment.retweeted}
                handleDeleteComment={handleDeleteComment}
                handleLikeComment={handleLikeComment}
                handleUnlikeComment={handleUnlikeComment}
                handleRetweetComment={handleRetweetComment}
                handleRemoveRetweetComment={handleRemoveRetweetComment}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
                followInformation={followInformation}
                followed_user_id={followed_user_id}
              />
            ))}
          </Stack>
        ) : null}
      </Grid>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {post.username !== user.username ? (
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
              handleDeletePost(post.id);
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
            navigator.clipboard.writeText(window.location.href);
            handleCloseUpload();
          }}
        >
          Copy Link
        </MenuItem>
      </Menu>
    </Grid>
  );
};
