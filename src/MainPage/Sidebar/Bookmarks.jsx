import React from "react";
import {
  Grid,
  Stack,
  SvgIcon,
  Typography,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import axios from "axios";
import BookmarksTweets from "./BookmarksTweets";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const Bookmarks = () => {
  const [posts, setPosts] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorElPost, setAnchorElPost] = React.useState(null);
  const openPost = Boolean(anchorElPost);

  console.log(posts.length);

  const [state, setState] = React.useState({
    openSnackbar: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnackbar } = state;

  const handleClickSnackbar = (newState) => {
    setState({ ...newState, openSnackbar: true });
  };

  const handleCloseSnackbar = (event, reason) => {
    setState({ ...state, openSnackbar: false });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickPost = (event) => {
    setAnchorElPost(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePost = () => {
    setAnchorElPost(null);
  };

  React.useEffect(() => {
    handleDisplayPosts();
  }, []);

  const handleDisplayPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/tweet/getbookmarks"
      );
      if (response.status === 200) {
        const jsonData = response.data.bookmarks;
        setPosts((prevPosts) => [...prevPosts, ...jsonData]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tweet/${id}/`);
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLikes = async (id) => {
    await axios
      .post(`http://localhost:3000/tweet/like`, {
        user_id: user.id,
        tweet_id: id,
      })
      .then((res) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                likes: res.data.likes,
                liked: true,
              };
            }
            return post;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (id) => {
    console.log(user.id);
    console.log(id);
    await axios
      .delete(`http://localhost:3000/tweet/unlike`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                likes: res.data.likes,
                liked: false,
              };
            }
            return post;
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
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                retweets: res.data.retweets,
                retweeted: true,
              };
            }
            return post;
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
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                retweets: res.data.retweets,
                retweeted: false,
              };
            }
            return post;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClearAllBookmarks = () => {
    try {
      if (posts.length === 0) {
        setAnchorEl(null);
        return;
      }
      axios.delete("http://localhost:3000/tweet/clearallbookmarks");
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.bookmarked === false)
      );
      setAnchorEl(null);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Grid
      flexDirection="row"
      height="100vh"
      overflow="scroll"
      minWidth="fit-content"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Grid item position="sticky" padding="6px 0px 0px 12px">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="column" alignContent="center">
            <Typography variant="h6" fontWeight="bold">
              Bookmarks
            </Typography>
            <Typography variant="span" color="textSecondary" fontSize={14}>
              @{user?.username}
            </Typography>
          </Stack>
          {posts.length !== 0 ? (
            <SvgIcon
              sx={{
                cursor: "pointer",
                fontSize: "20px",
                mr: 1,
              }}
              onClick={(event) => {
                handleClick(event);
              }}
            >
              <MoreHorizIcon />
            </SvgIcon>
          ) : null}
        </Stack>
      </Grid>
      {posts.length !== 0 ? (
        <Stack>
          {posts.map((post) => (
            <BookmarksTweets
              key={post.id}
              firstName={post.firstname}
              lastName={post.lastname}
              username={post.username}
              is_verified={post.is_verified}
              creation_date={post.creation_date}
              content={post.content}
              profile_picture={post.profile_picture}
              likes={post.likes}
              retweets={post.retweets}
              image_url={post.image_url}
              id={post.id}
              isLiked={post.liked}
              isRetweeted={post.retweeted}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikes}
              handleUnlikePost={handleUnlike}
              handleRetweet={handleRetweet}
              handleRemoveRetweet={handleRemoveRetweet}
            />
          ))}
        </Stack>
      ) : (
        <Stack p="28px 0px 0px 128px" width="35vw">
          <Typography variant="h5" fontWeight="bold" fontSize={32}>
            Save posts for later
          </Typography>
          <Typography variant="span" color="rgb(83, 100, 113)">
            Bookmark posts to easily find them again in the future.
          </Typography>
        </Stack>
      )}

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClearAllBookmarks();
            handleClickSnackbar({ vertical: "top", horizontal: "center" });
          }}
        >
          Clear all Bookmarks
        </MenuItem>
      </Menu>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical, horizontal }}
        message={
          <Stack direction="row" spacing={1} alignItems="center">
            <SvgIcon>
              <CheckCircleOutlineIcon />
            </SvgIcon>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Cleared all bookmarks !
            </Typography>
          </Stack>
        }
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        key={vertical + horizontal}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#1DA1F2",
            color: "#000",
          },
        }}
      />
      <Menu anchorEl={anchorElPost} open={openPost} onClose={handleClosePost}>
        {user.username !== posts[0]?.username ? (
          <Stack>
            <MenuItem onClick={handleClosePost}>
              Not interested in this post
            </MenuItem>
            <MenuItem onClick={handleClosePost}>
              Follow @{posts[0]?.username}
            </MenuItem>
          </Stack>
        ) : (
          <MenuItem
            onClick={() => {
              handleDeletePost(id);
              handleClosePost();
            }}
          >
            Delete this post
          </MenuItem>
        )}
      </Menu>
    </Grid>
  );
};
