import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { token } from "../.env";

export const AuthContext = createContext();

const AuthState = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      try{
        setIsLoading(true)
        setUser(jwtDecode(token))
        setIsLoading(false)
      }
      catch(err){
          setUser(null)
          setIsLoading(false)
      }
     

  },[])
  
  return { user, setUser, isLoading, setIsLoading };
};

const AuthProvider = ({ children }) => {
  const contextData = AuthState();
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
