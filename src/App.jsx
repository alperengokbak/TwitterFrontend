import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./LoginAndRegister/LoginScreen";
import RegisterScreen from "./LoginAndRegister/RegisterScreen";
import { LoginAuthentication } from "./AuthenticationSystem/LoginAuthentication";
import { AuthContext } from "./AuthenticationSystem/AuthenticationSystem";
import { Layouts } from "./Layouts";
import Feed from "./MainPage/Home/Feed";
import { Profile } from "./MainPage/ProfilePage/Profile";
import { CommentScreen } from "./MainPage/CommentScreen/CommentScreen";
import { Communities } from "./MainPage/Sidebar/Communities";
import { Bookmarks } from "./MainPage/Sidebar/Bookmarks";
import { Explore } from "./MainPage/Explore/Explore";

export const App = () => {
  const { user, setUser } = useContext(AuthContext);

  const checkUser = async () => {
    const user = await LoginAuthentication();
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <Layouts>
              <Feed />
            </Layouts>
          }
        />
        <Route
          path="/:username"
          element={
            <Layouts>
              <Profile />
            </Layouts>
          }
        />
        <Route
          path="/:username/status/:id"
          element={
            <Layouts>
              <CommentScreen />
            </Layouts>
          }
        />
        <Route
          path="/:username/communities"
          element={
            <Layouts>
              <Communities />
            </Layouts>
          }
        />
        <Route
          path="/i/bookmarks"
          element={
            <Layouts>
              <Bookmarks />
            </Layouts>
          }
        />
        <Route
          path="/explore"
          element={
            <Layouts>
              <Explore />
            </Layouts>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};
