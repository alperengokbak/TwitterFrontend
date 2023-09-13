import React from "react";
import { Button, Grid, Stack, Avatar, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";

export const EditProfile = ({ handleClose, userInformation }) => {
  const fileInputRef = React.useRef(null);
  const fileInputRef2 = React.useRef(null);

  const [profileWallpaper, setProfileWallpaper] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [firstname, setFirstname] = React.useState(
    userInformation.firstname || ""
  );
  const [lastname, setLastname] = React.useState(
    userInformation.lastname || ""
  );
  const [bio, setBio] = React.useState(userInformation.bio || "");
  const [location, setLocation] = React.useState(
    userInformation.location || ""
  );
  const [previewWallpaper, setPreviewWallpaper] = React.useState(
    userInformation.profile_wallpaper || null
  );
  const [previewProfilePicture, setPreviewProfilePicture] = React.useState(
    userInformation.profile_picture || null
  );

  const handleFileUploadProfilePicture = () => {
    fileInputRef.current.click();
  };
  const handleFileUploadProfileBackground = () => {
    fileInputRef2.current.click();
  };

  const handleSendCloudinaryBackgroundRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profileWallpaper);
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

  const handleSendCloudinaryAvatarRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profilePicture);
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
        console.error("Cloudinary avatar upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Cloudinary avatar upload error:", error);
    }
  };

  const handleClearImage = () => {
    fileInputRef.current.value = "";
    fileInputRef2.current.value = "";
    setProfileWallpaper("");
    setProfilePicture("");
    setPreviewWallpaper(null);
    setPreviewProfilePicture(null);
  };

  const handleEditProfile = async () => {
    let profileImage = previewProfilePicture;
    let backgroundImage = previewWallpaper;
    if (profilePicture) {
      profileImage = await handleSendCloudinaryAvatarRequest();
    }
    if (profileWallpaper) {
      backgroundImage = await handleSendCloudinaryBackgroundRequest();
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/profile/${userInformation.username}`,
        {
          profile_picture: profileImage,
          profile_wallpaper: backgroundImage,
          firstname: firstname,
          lastname: lastname,
          bio: bio,
          location: location,
        }
      );
      if (response.status === 200) {
      } else {
        console.log("Edit Profile Error:", response.status);
      }
    } catch (error) {
      console.log("Edit Profile Error:", error.response);
    }

    handleClearImage();
    handleClose();
  };

  React.useEffect(() => {
    if (profileWallpaper) {
      setPreviewWallpaper(URL.createObjectURL(profileWallpaper));
      URL.revokeObjectURL(profileWallpaper);
    }
  }, [profileWallpaper]);

  React.useEffect(() => {
    if (profilePicture) {
      setPreviewProfilePicture(URL.createObjectURL(profilePicture));
      URL.revokeObjectURL(profilePicture);
    }
  }, [profilePicture]);

  return (
    <Grid
      container
      flexDirection="row"
      height="64vh"
      overflow="scroll"
      webkitoverflowscrolling="touch"
      sx={{
        borderRadius: "10px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Grid
        item
        xs={12}
        position="sticky"
        zIndex={1}
        top={0}
        sx={{
          opacity: "0.95",
          backgroundColor: "#FFF",
        }}
      >
        <Stack
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between"
          m={1}
        >
          <Stack flexDirection="row" alignItems="center">
            <CloseIcon
              sx={{
                top: "0",
                mr: "10px",
                left: "0",
                cursor: "pointer",
                opacity: "0.7",
                height: "22px",
                width: "22px",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                  borderRadius: "50%",
                },
              }}
              onClick={handleClose}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Typography>
          </Stack>
          <Stack>
            <Button
              sx={{
                textAlign: "center",
                backgroundColor: "#000",
                color: "#FFF",
                top: "0",
                right: "0",
                height: "30px",
                width: "22px",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                },
              }}
              onClick={() => {
                handleEditProfile();
              }}
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <input
            type="file"
            ref={fileInputRef2}
            style={{ display: "none" }}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setProfileWallpaper(event.target.files[0]);
              }
            }}
          />
          <img
            src={previewWallpaper || "gray.png"}
            alt="background"
            style={{
              backgroundColor: "#000",
              objectFit: "cover",
              width: "100%",
              maxHeight: "200px",
            }}
          />
          <Button
            sx={{
              color: "#000",
              backgroundColor: "#000",
              opacity: "0.7",
              top: "-120px",
              left: "250px",
              height: "30px",
              width: "22px",
              "&:hover": {
                opacity: "0.8",
              },
            }}
          >
            <AddAPhotoIcon
              sx={{
                color: "#FFF",
                height: "30px",
                width: "22px",
              }}
              onClick={handleFileUploadProfileBackground}
            />
          </Button>
        </Stack>
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
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setProfilePicture(event.target.files[0]);
                }
              }}
            />
            <Avatar
              alt="Alperen Gokbak"
              src={previewProfilePicture || "gray.png"}
              sx={{
                transform: "translateX(-50%) translateY(-50%)",
                top: "-15px",
                left: "80px",
                overflow: "hidden",
                position: "absolute",
                paddingBottom: "100%",
                padding: "0px",
                paddingTop: "-50px",
                width: "112px",
                height: "112px",
                border: "4px solid #FFFFFF",
              }}
            />
            <Button
              sx={{
                color: "#000",
                backgroundColor: "#000",
                opacity: "0.7",
                top: "-30px",
                left: "-488px",
                height: "30px",
                width: "22px",
                "&:hover": {
                  opacity: "0.8",
                },
              }}
            >
              <AddAPhotoIcon
                sx={{
                  color: "#FFF",
                  height: "30px",
                  width: "22px",
                }}
                onClick={handleFileUploadProfilePicture}
              />
            </Button>
          </Stack>
          <Stack
            sx={{
              marginTop: 2,
              top: "15px",
              padding: 1,
              border: "4px solid #FFFFFF",
            }}
          >
            <TextField
              fullWidth
              label="Firstname"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              sx={{
                marginBottom: "25px",
              }}
            />
            <TextField
              fullWidth
              label="Lastname"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              sx={{
                marginBottom: "25px",
              }}
            />
            <TextField
              fullWidth
              label="Bio"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              multiline
              rows={4}
              sx={{
                marginBottom: "25px",
              }}
            />
            <TextField
              fullWidth
              label="Location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                marginBottom: "25px",
              }}
            />
            <TextField
              fullWidth
              label="Website"
              placeholder="Website"
              sx={{
                marginBottom: "25px",
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
