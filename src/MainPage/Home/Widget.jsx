import React from "react";
import {
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Widget = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const handleTrend = async () => {
      try {
        const response = await fetch(`http://localhost:3000/trends`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    handleTrend();
  }, []);

  return (
    <Grid
      container
      padding={"0 20px"}
      justifyContent={"space-between"}
      sx={{
        borderLeft: "2px solid #e6ecf0",
        maxHeight: "100vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="filled"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            marginTop: 1,
            marginBottom: 1,
            position: "sticky",
            top: 0,
          }}
        />
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
        <Paper
          sx={{
            backgroundColor: "#f5f8fa",
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              padding: "2%",
              marginLeft: "4%",
              cursor: "pointer",
            }}
          >
            Trends for you
          </Typography>
          <Box>
            <Box
              sx={{
                cursor: "pointer",
                width: "100%",
              }}
            >
              {data.map((trend, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "8vh",
                    "&:hover": {
                      backgroundColor: "#e0e6eb",
                    },
                  }}
                >
                  <Box
                    sx={{
                      padding: "2%",
                      marginLeft: "4%",
                    }}
                  >
                    <Typography variant="span">{trend.title}</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {trend.keyword}
                    </Typography>
                    <Typography variant="span">
                      {trend.post + "K post"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
