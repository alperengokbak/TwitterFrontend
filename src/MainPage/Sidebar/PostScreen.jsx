import * as React from "react";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { TweetBoxForPostScreen } from "./TweetBoxForPostScreen";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";

export const PostScreen = () => {
  const { isDesktop } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      marginTop={"15px"}
      borderRadius="30px"
      textTransform={"inherit"}
      border={"none"}
      marginLeft={isDesktop ? "0px" : "4px"}
    >
      {isDesktop ? (
        <Button
          className="postScreen"
          variant="contained"
          fullWidth
          onClick={handleOpen}
        >
          Post
        </Button>
      ) : (
        <IconButton aria-label="send" title="Send" onClick={handleOpen}>
          <SendIcon />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <TweetBoxForPostScreen handleClose={handleClose} />
        </Box>
      </Modal>
    </Stack>
  );
};
