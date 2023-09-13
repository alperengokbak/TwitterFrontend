import React, { createContext, useState } from "react";
import { useMediaQuery } from "@mui/material";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [user, setUser] = useState(undefined);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isDesktop,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
