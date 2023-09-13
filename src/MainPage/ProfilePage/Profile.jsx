import React from "react";
import {
  Grid,
  Stack,
  Typography,
  SvgIcon,
  Avatar,
  Modal,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Verified from "@mui/icons-material/Verified";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import { Link, useParams } from "react-router-dom";
import NavTabs from "./NavTabs";
import axios from "axios";
import { EditProfile } from "./EditProfile";
import { Unfollow } from "./Unfollow";

export const Profile = () => {
  let { username } = useParams();
  const [userInformation, setUserInformation] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);
  const [userLikes, setUserLikes] = React.useState([]);
  const [userMedia, setUserMedia] = React.useState([]);
  const [userRetweet, setUserRetweet] = React.useState([]);
  const [userRetweetedUsername, setUserRetweetedUsername] = React.useState([]);
  const [userPostsCount, setUserPostsCount] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const followed_user_id = userInformation.id;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUnfollowModal, setOpenUnfollowModal] = React.useState(false);
  const handleOpenUnfollowModal = () => setOpenUnfollowModal(true);
  const handleCloseUnfollowModal = () => setOpenUnfollowModal(false);

  React.useEffect(() => {
    handleUserPosts();
    handleUserInformation();
    handleImagePost();
  }, []);
  React.useEffect(() => {
    handleLikedPosts();
  }, [userPosts.liked]);
  React.useEffect(() => {
    handleRetweetedPosts();
  }, [userPosts.retweeted]);

  const handleFollow = async (followed_user_id) => {
    const response = await axios.post(`http://localhost:3000/profile/follow`, {
      follower_user_id: user.id,
      followed_user_id: followed_user_id,
    });
    if (response.status === 200) {
      setUserInformation((prevUserInformation) => ({
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
      setUserInformation((prevUserInformation) => ({
        ...prevUserInformation,
        following: false,
        followers: parseInt(prevUserInformation.followers - 1),
      }));
      handleCloseUnfollowModal();
    } else {
      console.log("Error");
    }
  };

  const handleUserInformation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${username}`
      );
      if (response.status === 200) {
        setUserInformation(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleRetweetedPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${username}/retweeted`
      );
      if (response.status === 200) {
        setUserRetweet((prevPosts) => [...prevPosts, ...response.data.items]);
        setUserRetweetedUsername((prevPosts) => [
          ...prevPosts,
          ...response.data.username,
        ]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${username}/posts`
      );
      if (response.status === 200) {
        setUserPosts((prevPosts) => [...prevPosts, ...response.data.items]);
        setUserPostsCount(response.data.count);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLikedPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${username}/liked`
      );
      if (response.status === 200) {
        setUserLikes((prevPosts) => [...prevPosts, ...response.data]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleImagePost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${username}/media`
      );
      if (response.status === 200) {
        setUserMedia((prevPosts) => [...prevPosts, ...response.data]);
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
        setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        setUserRetweet((prevPosts) =>
          prevPosts.filter((post) => post.id !== id)
        );
        setUserLikes((prevPosts) => prevPosts.filter((post) => post.id !== id));
        setUserMedia((prevPosts) => prevPosts.filter((post) => post.id !== id));
        setUserPostsCount((prevPosts) => prevPosts - 1);
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
        setUserPosts((prevPosts) =>
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
        setUserRetweet((prevPosts) =>
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
        setUserMedia((prevPosts) =>
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
        setUserLikes((prevPosts) =>
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
    await axios
      .delete(`http://localhost:3000/tweet/unlike`, {
        data: {
          user_id: user.id,
          tweet_id: id,
        },
      })
      .then((res) => {
        setUserPosts((prevPosts) =>
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
        setUserRetweet((prevPosts) =>
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
        setUserMedia((prevPosts) =>
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
        setUserLikes((prevPosts) =>
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
        setUserPosts((prevPosts) =>
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
        setUserRetweet((prevPosts) =>
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
        setUserMedia((prevPosts) =>
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
        setUserLikes((prevPosts) =>
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
        setUserPosts((prevPosts) =>
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
        setUserRetweet((prevPosts) =>
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
        setUserMedia((prevPosts) =>
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
        setUserLikes((prevPosts) =>
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
        {/*Header Section*/}
        <Stack flexDirection="row" alignItems="center">
          <SvgIcon
            className="profileBackButton"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowBackIcon />
          </SvgIcon>
          <Stack justifyItems="flex-start" ml={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              {userInformation.firstname} {userInformation.lastname}
            </Typography>
            <Typography
              variant="span"
              sx={{
                color: "#808080",
                fontSize: "15px",
                mb: 0.5,
              }}
            >
              {userPostsCount} Tweets
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
        <Grid container>
          <Grid item xs={12}>
            {/*Upside Navbar(Background Image + Details)*/}
            <Grid container flexDirection="column">
              <Grid item xs={12}>
                {/*Profile Background Image*/}
                <img
                  src={userInformation.profile_wallpaper}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    maxHeight: "200px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/*Profile Details*/}
                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  position="relative"
                >
                  <Avatar
                    alt="Alperen Gokbak"
                    src={userInformation.profile_picture}
                    sx={{
                      transform: "translateX(-50%) translateY(-50%)",
                      top: "-5px",
                      left: "80px",
                      overflow: "hidden",
                      position: "absolute",
                      paddingBottom: "100%",
                      padding: "0px",
                      paddingTop: "-50px",
                      width: "128px",
                      height: "128px",
                      border: "4px solid #FFFFFF",
                    }}
                  />
                  {username === user.username ? (
                    <Link
                      to="#"
                      onClick={() => {
                        handleOpen();
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "12px",
                        width: "90px",
                        marginRight: "20px",
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#FFFFFF",
                        textDecoration: "none",
                        fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                        borderTopWidth: "1px",
                        borderRightWidth: "1px",
                        borderBottomWidth: "1px",
                        borderLeftWidth: "1px",
                        borderTopStyle: "solid",
                        borderRightStyle: "solid",
                        borderBottomStyle: "solid",
                        borderLeftStyle: "solid",
                        borderTopColor: "rgb(207, 217, 222)",
                        borderRightColor: "rgb(207, 217, 222)",
                        borderBottomColor: "rgb(207, 217, 222)",
                        borderLeftColor: "rgb(207, 217, 222)",
                        borderRadius: "24px",
                        color: "#000000",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Edit profile
                    </Link>
                  ) : !userInformation.following ? (
                    <Button
                      onClick={() => {
                        handleFollow(followed_user_id);
                      }}
                      variant="contained"
                      sx={{
                        height: "34px",
                        width: "112px",
                        marginRight: "20px",
                        marginTop: "10px",
                        backgroundColor: "#000000",
                        borderRadius: "24px",
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: "bold",
                        boxShadow: "none",
                        "&:hover": {
                          color: "#FFFFFF",
                          backgroundColor: "#000000",
                          opacity: "0.8",
                        },
                      }}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleOpenUnfollowModal();
                      }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      sx={{
                        height: "34px",
                        width: "112px",
                        marginRight: "20px",
                        marginTop: "10px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "24px",
                        color: "#000000",
                        fontSize: "15px",
                        fontWeight: "bold",
                        boxShadow: "none",
                        border: "1px solid #D3D3D3",
                        "&:hover": {
                          color: "rgb(244,33,46)",
                          backgroundColor: "rgb(246,231,233)",
                          borderColor: "rgb(236,204,207)",
                        },
                      }}
                    >
                      {isHovering ? "Unfollow" : "Following"}
                    </Button>
                  )}
                </Stack>
                <Stack flexDirection="column" m="24px 0px 8px 16px">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {userInformation.firstname} {userInformation.lastname}
                    {userInformation.is_verified ? (
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
                    variant="span"
                    sx={{
                      color: "#808080",
                      fontSize: "15px",
                      mb: 2,
                    }}
                  >
                    @{userInformation.username}
                  </Typography>
                  <Typography variant="body1" fontSize="15px" mb={1}>
                    {userInformation.bio}
                  </Typography>
                  <Stack flexDirection="row" alignItems="center">
                    <Stack flexDirection="row" alignItems="center" mb={1}>
                      {userInformation.location ? (
                        <FmdGoodOutlinedIcon
                          sx={{
                            fontSize: "17px",
                            color: "#808080",
                            mr: 0.5,
                          }}
                        />
                      ) : null}
                      <Typography
                        variant="body1"
                        fontSize="15px"
                        alignItems="center"
                      >
                        {userInformation.location}
                      </Typography>
                    </Stack>
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      mb={1}
                      ml={userInformation.location ? 1 : 0}
                    >
                      <CalendarMonthIcon
                        sx={{
                          fontSize: "15px",
                          color: "#808080",
                          mr: 0.5,
                        }}
                      />
                      <Typography variant="body1" fontSize="15px">
                        Joined{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack flexDirection="row" ml={0.3}>
                    <Stack flexDirection="row" mr={1}>
                      <Typography
                        variant="span"
                        color="#000"
                        mr={0.5}
                        fontSize="15px"
                      >
                        {userInformation.followers}
                      </Typography>
                      <Typography variant="span" color="gray" fontSize="15px">
                        Followers
                      </Typography>
                    </Stack>
                    <Stack flexDirection="row">
                      <Typography
                        variant="span"
                        color="#000"
                        mr={0.5}
                        fontSize="15px"
                      >
                        {userInformation.followed}
                      </Typography>
                      <Typography variant="span" color="gray" fontSize="15px">
                        Following
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/*NavBar*/}
            <NavTabs
              userMedia={userMedia}
              userPosts={userPosts}
              userLikes={userLikes}
              userRetweet={userRetweet}
              userRetweetedUsername={userRetweetedUsername}
              handleDeletePost={handleDeletePost}
              handleLikes={handleLikes}
              handleUnlike={handleUnlike}
              handleRetweet={handleRetweet}
              handleRemoveRetweet={handleRemoveRetweet}
            />
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "650px",
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
          }}
        >
          <EditProfile
            userInformation={userInformation}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <Modal open={openUnfollowModal} onClose={handleCloseUnfollowModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "250px",
            height: "260px",
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
            padding: "32px",
          }}
        >
          <Unfollow
            handleCloseUnfollowModal={handleCloseUnfollowModal}
            username={username}
            userInformation={userInformation}
            handleUnfollow={handleUnfollow}
          />
        </Box>
      </Modal>
    </Grid>
  );
};
