import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AuthProvider from "./provider/AuthProvider";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";

const { ToastContainer, toast } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await fetch(
                "http://localhost:3000/api/auth/profile",
                {
                  headers: { Authorization: `Bearer ${token}` },
                  method: "GET",
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();

              console.log("DATA FROM SERVER", data);

              return data;
            } catch (error) {
              console.error("Error fetching data:", error);
              toast({
                title: "Session has expired",
                description: "Please log in again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
              return redirect("/login");
            }
          } else {
            console.log("NO TOKEN");
            toast({
              title: "Error",
              description: "You must have an account to view this page",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            return redirect("/sign-up");
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
