import React from "react";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, Stack } from "@mui/material";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const Verified = ({ handleClose, id }) => {
  const handleSubscribe = () => {
    try {
      const response = axios.put(
        "http://localhost:3000/userProcess/becomeverifieduser",
        {
          id: id,
        }
      );
      if (response.status === 200) {
        console.log("Successfully subscribed!!");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mt: 4,
        }}
      >
        Who are you ?
      </Typography>
      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Choose the right subscription for you:
      </Typography>
      <Grid
        container
        height="15vh"
        display="flex"
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        <Grid
          item
          xs={5.5}
          sx={{
            cursor: "pointer",
            border: "1px solid #D3D3D3",
            boxShadow: "0px 0px 5px 0px #D3D3D3",
            borderRadius: "15px",
            padding: "8px",
            "&:hover": {
              backgroundColor: "#EAEAEA",
            },
          }}
        >
          <Stack
            spacing={0.3}
            paddingTop={2.5}
            paddingBottom={2}
            paddingLeft={2}
          >
            <Typography
              variant="span"
              sx={{
                color: "#808080",
              }}
            >
              Premium
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              I'm an individual
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: "15px",
                color: "#808080",
              }}
            >
              For individuals and creators
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={5.5}
          sx={{
            border: "1px solid #D3D3D3",
            boxShadow: "0px 0px 5px 0px #D3D3D3",
            borderRadius: "15px",
            padding: "8px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#EAEAEA",
            },
          }}
        >
          <Stack
            spacing={0.3}
            paddingTop={1.5}
            paddingBottom={1}
            paddingLeft={2}
          >
            <Typography
              variant="span"
              sx={{
                color: "#808080",
              }}
            >
              Verified Organizations
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              I'm an organization
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: "15px",
                color: "#808080",
              }}
            >
              For business, government agencies, and non-profits
            </Typography>
          </Stack>
        </Grid>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#000",
            mt: 4,
            height: "55px",
            borderRadius: "50px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#000",
              opacity: "0.8",
            },
          }}
          onClick={() => {
            handleSubscribe();
            alert("You have subscribed successfully");
            handleClose();
          }}
        >
          Subscribe
        </Button>
        <Stack width="100%">
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 4,
            }}
          >
            Learn more about Premium and Verified Organizations
          </Typography>
        </Stack>
      </Grid>
    </Stack>
  );
};
