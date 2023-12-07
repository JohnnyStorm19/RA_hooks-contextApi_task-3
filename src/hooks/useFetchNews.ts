import { useEffect, useState } from "react";
import { INews } from "../models";

const useFetchNews = ({
  isLogged,
  token,
}: {
  isLogged: boolean;
  token: { token: string };
}) => {
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [shoulFetchData, setShoulFetchData] = useState(true);

  useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch("http://localhost:7070/private/news", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token.token,
            },
          });

          if (!response.ok) {
            throw new Error("Error fetching user profile");
          }

          const newsData = await response.json();
          setNewsData(newsData);
        } catch (error) {
          console.error(error);
        } finally {
          setShoulFetchData(false);
        }
      };
      if (isLogged && shoulFetchData) {
        fetchNews();
      }
  }, [isLogged, token, shoulFetchData, newsData]);

  return [{ newsData, setShoulFetchData }];
};

export default useFetchNews;
