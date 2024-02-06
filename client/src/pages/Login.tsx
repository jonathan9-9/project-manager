import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      usernameInput: usernameInput,
      passwordInput: passwordInput,
    };
  };
};

export default Login;
