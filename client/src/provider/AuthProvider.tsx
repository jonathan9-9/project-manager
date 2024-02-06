import jwt from "jsonwebtoken";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import { jwtConstants } from "../constants";

interface UserContextType {
  username: string | null;
  setToken: (token: string | null) => void;
}

interface ReactProps {
  children: ReactNode;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider = ({ children }: ReactProps) => {
  const [currentUser, setCurrentUser] = useState<UserContextType>();

  useEffect(() => {
    const receivedToken = "{replace_with_token}";

    localStorage.setItem("token", receivedToken);

    verifyAndDecodeToken(receivedToken);
  }, []);

  function verifyAndDecodeToken(token: string) {
    try {
      const jwt = require("jsonwebtoken");
      const decodedToken: any = jwt.decode(token, jwtConstants.secret);
      setCurrentUser(decodedToken);
    } catch (error) {
      console.error("Unable to verify token");
    }
    console.error("Could not decode token");
  }
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth is needed with useContext for authentication");
  }
  return context;
};
