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
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    username: null,
    setToken: (token: string | null) => setToken(token),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    setToken(token);
  }, []);

  function verifyAndDecodeToken(token: string) {
    try {
      if (token) {
        const jwt = require("jsonwebtoken");
        const decodedToken: any = jwt.verify(token, jwtConstants.secret);
        setCurrentUser(decodedToken);
      } else {
        setCurrentUser({
          username: null,
          setToken: (token: string | null) => setToken(token),
        });
      }
    } catch (error) {
      console.error("Unable to verify or decode token", error);
    }
    console.error("Could not decode token");
  }

  function setToken(token: string | null) {
    localStorage.setItem("token", token as string);
    verifyAndDecodeToken(token as string);
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
