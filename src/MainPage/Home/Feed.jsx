import React from "react";
import { Button, Stack } from "@mui/material";
import TweetBox from "./TweetBox";
import Post from "./Post";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

function Feed() {
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showMore, setShowMore] = React.useState(true);
  const { user } = React.useContext(AuthContext);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  React.useEffect(() => {
    handlePosts();
  }, [currentPage]);

  const postTweet = async (imageUrl, tweet) => {
    try {
      const response = await axios.post("http://localhost:3000/tweet", {
        user_id: user.id,
        content: tweet,
        image_url: imageUrl,
      });

      if (response.status === 201) {
        console.log("Tweet posted successfully!");
        setPosts((prevPosts) => [response.data, ...prevPosts]);
      } else {
        console.error("Failed to post tweet");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handlePosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tweet`, {
        params: {
          page: currentPage,
          pageSize: 5,
        },
      });
      if (response.status === 200) {
        const jsonData = response.data;
        setPosts((prevPosts) => [...prevPosts, ...jsonData.items]);
        setShowMore(currentPage !== jsonData.totalPages);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleShowMore = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
    await axios
      .delete(`http://localhost:3000/tweet/unlike`, {
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

  return (
    <Stack
      sx={{
        height: "100vh",
        overflowY: "scroll",
        minWidth: "fit-content",
        WebkitOverflowScrolling: "touch",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Stack
        sx={{
          zIndex: 100,
          position: "-webkit-sticky",
          top: 0,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingTop: "10px",
            paddingLeft: "20px",
            fontWeight: "bold",
          }}
        >
          Home
        </Typography>
        <Divider />
        <TweetBox postTweet={postTweet} />
      </Stack>
      <Divider />
      <Stack>
        {posts.map((post) => (
          <Post
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
        {showMore && (
          <Stack>
            <Button
              className="showMoreButton"
              disabled={!showMore}
              onClick={handleShowMore}
            >
              Show More Tweets
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Feed;
