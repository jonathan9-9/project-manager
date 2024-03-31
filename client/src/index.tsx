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

import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Project from "./pages/Project";

const { ToastContainer, toast } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

          return data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
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
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await fetch(
                "http://localhost:3000/api/auth/user-projects",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },

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
                title: "An error occurred",
                description: "Failed to load projects.",
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
      {
        path: "/reset-password/:token/:id",
        element: <ResetPassword />,
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await fetch(
                `http://localhost:3000/api/auth/project/${params.id}`,
                {
                  // no json Content Type
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },

                  method: "GET",
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();

              console.log("response of single project data", data);

              if (data && Object.keys(data).length === 0) {
                toast({
                  title: "Error",
                  description: "Project does not exist",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "top-right",
                });
                return redirect("/projects");
              }

              return data;
            } catch (error) {
              console.error("Error fetching data:", error);
              toast({
                title: "An error occurred",
                description: "Failed to load projects.",
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
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
