import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Box, Tab, Stack, Typography, Button } from "@mui/material";
import ProfilePost from "./ProfilePost";
import Modal from "@mui/material/Modal";
import { Verified } from "../Sidebar/Verified";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function NavTabs({
  userPosts,
  handleDeletePost,
  handleLikes,
  handleUnlike,
  handleRetweet,
  handleRemoveRetweet,
  userLikes,
  userMedia,
  userRetweet,
  userRetweetedUsername,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Profile nav tabs"
        variant="fullWidth"
        centered
        sx={{
          "&:hover": {
            color: "#1DA1F2",
          },
        }}
      >
        <Tab label="Posts" />
        <Tab label="Replies" />
        <Tab label="Highlights" />
        <Tab label="Media" />
        <Tab label="Likes" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        {userPosts.map((post) => (
          <ProfilePost
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
            retweeter_username={post.retweeter_username}
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {userRetweet.map((post) => (
          <ProfilePost
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
            userRetweetedUsername={userRetweetedUsername}
          />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Stack width="100%">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            m="32px auto 32px auto"
            p="0px 32px 0px 32px"
            maxWidth="336px"
          >
            <Typography variant="h4" fontWeight="bold">
              Verified only
            </Typography>
            <Typography
              variant="span"
              color="gray"
              mt={1}
              fontSize="17px"
              wordWrap="break-word"
              mb={4}
            >
              You must be Verified to highlight posts on your profile.
            </Typography>
            <Button
              onClick={handleOpen}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                alignSelf: "flex-start",
                minHeight: "52px",
                minWidth: "52px",
                width: "156px",
                borderRadius: "9999px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#000",
                  opacity: "0.8",
                },
              }}
            >
              Get Verified
            </Button>
          </Box>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {userMedia.map((post) => (
          <ProfilePost
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {userLikes.map((post) => (
          <ProfilePost
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
      </CustomTabPanel>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "390px",
            bgcolor: "background.paper",
            p: 8,
            borderRadius: "20px",
            boxShadow: 24,
          }}
        >
          <Verified handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
