import React from "react";
import {
  Button,
  Stack,
  Avatar,
  Grid,
  IconButton,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import GifIcon from "@mui/icons-material/Gif";
import PollIcon from "@mui/icons-material/Poll";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TextField from "@mui/material/TextField";
import { TweetBoxIcon } from "./TweetBoxAndPostIcons";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

export const TweetBoxForPostScreen = ({ handleClose }) => {
  const [posts, setPosts] = React.useState([]);
  const [tweetMessage, setTweetMessage] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);
  const { user } = React.useContext(AuthContext);

  const style = {
    position: "absolute",
    top: imageUrl ? "50%" : "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: imageUrl ? imageUrl.height : "15%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 2,
  };

  const fileInputRef = React.useRef(null);

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
    setTweetMessage("");
    setImageUrl("");
    setPreviewImage(null);
  };

  const handlePostTweet = async () => {
    let uploadCloudinaryUrl = await handleFileSelected();
    try {
      const response = await axios.post("http://localhost:3000/tweet", {
        user_id: user.id,
        content: tweetMessage,
        image_url: uploadCloudinaryUrl,
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

  React.useEffect(() => {
    if (imageUrl) {
      setPreviewImage(URL.createObjectURL(imageUrl));
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  return (
    <Box sx={style}>
      <Stack padding={1}>
        <form
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack padding="16px 8px 16px 8px" flexDirection="row">
            <Avatar
              className="Profile Image"
              alt="Alperen Gokbak"
              src={user.profile_picture}
            />
            <Stack direction={"column"} width="100%">
              <TextField
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="What's happening?"
                value={tweetMessage}
                onChange={(e) => setTweetMessage(e.target.value)}
                rows={2}
                multiline
                fullWidth
                sx={{
                  marginLeft: 2,
                  marginRight: 3,
                  fontSize: "20px",
                }}
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
            </Stack>
          </Stack>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  marginLeft: 6.5,
                }}
              >
                <TweetBoxIcon
                  handleOpen={handleFileUpload}
                  text="ImageIcon"
                  Icon={ImageIcon}
                />
                <TweetBoxIcon text="GifIcon" Icon={GifIcon} />
                <TweetBoxIcon text="PollIcon" Icon={PollIcon} />
                <TweetBoxIcon
                  text="EmojiEmotionsIcon"
                  Icon={EmojiEmotionsIcon}
                />
                <TweetBoxIcon text="ScheduleIcon" Icon={ScheduleIcon} />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  handlePostTweet();
                  handleClose();
                }}
                disabled={!tweetMessage && !imageUrl}
                sx={{
                  marginRight: 0.5,
                }}
              >
                Post
              </Button>
            </Grid>
          </Grid>
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
        </form>
      </Stack>
    </Box>
  );
};
