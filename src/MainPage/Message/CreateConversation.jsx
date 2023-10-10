import React from "react";
import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Users } from "./Users";
import axios from "axios";

export const CreateConversation = ({ handleCloseConversation }) => {
  const [searchPeople, setSearchPeople] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const createConversation = async (message) => {
    try {
      const res = await axios.post("http://localhost:3000/createmessage", {
        sent_user_id: searchPeople.id,
        message: "dsadsa",
      });
      if (res.data.status === 200) {
        const jsonResults = res.data.results;
        setMessage(jsonResults);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchPeople = async (criteria) => {
    const response = axios
      .get(`http://localhost:3000/users?firstname=${criteria}`)
      .then((response) => {
        const names = response.data.map((result) => {
          return {
            firstname: result.firstname,
            lastname: result.lastname,
            username: result.username,
            is_verified: result.is_verified,
            profile_picture: result.profile_picture,
            id: result.id,
          };
        });
        return names;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response.then((names) => names);
  };

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setSearchPeople(await handleSearchPeople(criteria));
    }, 500)
  ).current;

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  React.useEffect(() => {
    createConversation();
  }, []);

  return (
    <Stack
      height="100dvh"
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
      <Stack position="sticky">
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <CloseIcon
              onClick={handleCloseConversation}
              sx={{
                height: "20px",
                width: "20px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "rgba(29, 155, 240, 0.1)",
                  borderRadius: "20px",
                },
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              New message
            </Typography>
          </Stack>
          <Button
            className="newMessageBtn"
            variant="contained"
            disabled={!searchPeople}
          >
            Next
          </Button>
        </Stack>
        <TextField
          placeholder="Search people"
          onChange={handleChange}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    height: "22px",
                    width: "22px",
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              mt: "10px",
              height: "45px",
            },
          }}
        />
        <Divider
          sx={{
            border: "1px solid #E4E4E4",
          }}
        />
      </Stack>
      <Stack
        maxHeight="calc(100dvh - 58px)"
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {searchPeople.map((user) => (
          <Users
            key={user}
            firstName={user.firstname}
            lastName={user.lastname}
            username={user.username}
            is_verified={user.is_verified}
            profile_picture={user.profile_picture}
            id={user.id}
          />
        ))}
      </Stack>
    </Stack>
  );
};
