import { useEffect, useState } from "react";
import { IUserData } from "../models";

const useProfileRequest = (isLogged: boolean, token: { token: string }) => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [shoulFetchData, setShoulFetchData] = useState(true);

  useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch("http://localhost:7070/private/me", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token.token,
            },
          });

          if (!response.ok) {
            throw new Error("Error fetching user profile");
          }

          const userData = await response.json();
          setUserData(userData);

          localStorage.setItem('profile', JSON.stringify(userData));
        } catch (error) {
          console.error(error);
        } finally {
          setShoulFetchData(false);
        }
    }
    if (isLogged && shoulFetchData) {
        fetchUserProfile();
    }
  }, [isLogged, token, shoulFetchData, userData]);

  return [{ userData, setShoulFetchData }];
};

export default useProfileRequest;
