import { ReactNode, createContext, useState, useContext } from "react";

interface UserContextType {
  username: boolean | null;
  setToken: (token: string) => void;
}

interface ReactProps {
  children: ReactNode;
}

const AuthContext = createContext<UserContextType>({
  username: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: ReactProps) => {
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    username: null,
    setToken: setToken,
  });

  // console.log("CURRENT USER", currentUser);
  function verifyAndDecodeToken(token: string) {
    try {
      if (token) {
        const tokenComponents = token.split(".");
        const payload = JSON.parse(atob(tokenComponents[1]));

        // const ttl = Math.floor(new Date().getTime() / 1000) < payload?.exp;
        const username = payload?.username;
        setCurrentUser({ username: username, setToken: setToken });
      }
    } catch (error) {
      console.error("Unable to verify or decode token", error);
    }
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
