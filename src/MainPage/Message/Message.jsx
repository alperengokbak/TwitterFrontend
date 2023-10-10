import React from "react";
import { Stack, Divider } from "@mui/material";
import { UserTabs } from "./UserTabs";
import { MessagesPage } from "./MessagesPage";
import { AuthContext } from "../../AuthenticationSystem/AuthenticationSystem";
import axios from "axios";

const myDivider = (
  <Divider
    sx={{
      borderLeft: "1px solid rgb(239, 243, 244)",
    }}
    orientation="vertical"
    flexItem
  />
);

export const Message = () => {
  const { isDesktop, user } = React.useContext(AuthContext);
  const [userTabsInfo, setUserTabsInfo] = React.useState([]);
  const [messagePageInfo, setMessagePageInfo] = React.useState([]);
  const [hideMessagePage, setHideMessagePage] = React.useState(false);

  const handleUserTabsInformation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${user.username}`
      );
      if (response.status === 200) {
        setUserTabsInfo(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleMessagePageInformation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${user.username}`
      );
      if (response.status === 200) {
        setMessagePageInfo(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    handleUserTabsInformation();
    handleMessagePageInformation();
  }, []);

  return (
    <Stack direction="row" height="100dvh">
      {isDesktop ? (
        <UserTabs
          userTabsInfo={userTabsInfo}
          setHideMessagePage={setHideMessagePage}
          isDesktop={isDesktop}
        />
      ) : hideMessagePage ? (
        <UserTabs
          userTabsInfo={userTabsInfo}
          setHideMessagePage={setHideMessagePage}
          isDesktop={isDesktop}
        />
      ) : (
        <Stack direction="row" width="100%">
          <MessagesPage
            messagePageInfo={messagePageInfo}
            setHideMessagePage={setHideMessagePage}
          />
          {myDivider}
        </Stack>
      )}
      {isDesktop ? myDivider : null}
      {isDesktop ? (
        <Stack direction="row">
          <MessagesPage messagePageInfo={messagePageInfo} />
          {myDivider}
        </Stack>
      ) : null}
    </Stack>
  );
};
