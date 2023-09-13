import React from "react";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack, Modal, Box } from "@mui/material";
import { Verified } from "./Verified";

export const CommunitiesGetVerified = ({ handleClose, id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = async () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  return (
    <Stack>
      <CloseIcon
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          cursor: "pointer",
          opacity: "0.7",
          height: "22px",
          width: "22px",
          m: 2,
          "&:hover": {
            backgroundColor: "#D3D3D3",
            borderRadius: "50%",
          },
        }}
        onClick={handleClose}
      />
      <Stack p={3}>
        <Typography variant="h5" fontWeight="bold" fontSize={25}>
          Subscribe today
        </Typography>
        <Typography variant="span" color="gray" mt={0.5} fontSize={18}>
          Only verified users can create a Community. Sign up for Premium to
          continue.
        </Typography>
      </Stack>
      <Stack maxWidth="432px" ml={2.5}>
        <Button
          className="subscribeToday"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Subscribe Today
        </Button>
        <Button className="noThanks" onClick={handleClose}>
          No thanks
        </Button>
      </Stack>
      <Modal open={open} onClose={handleCloseModal}>
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
          <Verified id={id} handleClose={handleCloseModal} />
        </Box>
      </Modal>
    </Stack>
  );
};
