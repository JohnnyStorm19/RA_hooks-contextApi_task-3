import { useEffect, useState } from "react";

const useLogin = (submittedData: {
  userLogin: string;
  userPassword: string;
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState({ token: "" });
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState('')

  
  useEffect(() => {
    setIsError({ status: false, message: "" });
    const loggedIn = async () => {
      setIsLoading(true);

      const { userLogin, userPassword } = submittedData;
      try {
        const response = await fetch("http://localhost:7070/auth", {
          method: "POST",
          body: JSON.stringify({ login: userLogin, password: userPassword }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          setServerResponse(error.message);
          throw new Error("Error fetching");
        }
        if (response.status === 400 || response.status === 500) {
          const error = await response.json();
          console.log('error:', error)
          setServerResponse(error.message);
          localStorage.clear();
        }

        const token = await response.json();

        setToken(token);
        setIsLogged(true);
        setIsError({ status: false, message: "" });

        localStorage.setItem("token", token.token);
      } catch (error) {
        console.error(error);
        if (!serverResponse.length) {
          setIsError({
            status: true,
            message: "Check on your internet connection and/or try again. But it could be that server is unavailable...",
          });
        } else {
          setIsError({
            status: true,
            message: serverResponse,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (
      submittedData.userLogin.length &&
      submittedData.userPassword.length &&
      localStorage.getItem("token") === null
    ) {
      loggedIn();
    } else if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token") as string;
      setToken({ token: token });
      setIsLogged(true);
      setIsError({ status: false, message: "" });
    }
  }, [submittedData, serverResponse]);

  return [{ isLogged, token, setIsLogged, isError, isLoading }];
};

export default useLogin;
