import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const authContext = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      usernameInput: usernameInput,
      passwordInput: passwordInput,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const receivedToken = responseData.access_token;

        authContext.setToken(receivedToken);
      } else {
        console.error("error fetching token");
      }
    } catch (error) {
      console.error("failed to fetch data", error);
    }
  };

  return <div>Hello</div>;
};

export default Login;
