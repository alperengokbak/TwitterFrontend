import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterScreen() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    });

    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1DA1F2" }}>
          <TwitterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, background: "#1DA1F2" }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Link href="/login" variant="body2" sx={{ color: "#1DA1F2" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
