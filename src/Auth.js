 import React, { useEffect, useState } from "react";
import app from "./base.js";
import {setSessionCookie,getSessionCookie} from "./session";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
 

  //get dat from session cookie of current user
  const currentUser=getSessionCookie().currentuser
  return (
    //provide current user to all route using context
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
