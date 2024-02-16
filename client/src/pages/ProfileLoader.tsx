import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProfileLoader = () => {
  const token = localStorage.getItem("token");
  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (token && authContext.username) {
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
          console.error("Error fetching data:", error);
          return redirect("/login");
        }
      } else {
        console.log("NO TOKEN");
        return redirect("/sign-up");
      }
    };
    fetchData();
  }, [token, authContext.username]);

  return null;
};

export default ProfileLoader;
