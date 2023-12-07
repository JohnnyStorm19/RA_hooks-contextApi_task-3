import "./App.css";
import { useState } from "react";
import FormHeader from "./components/FormHeader/FormHeader";
import Header from "./components/Header/Header";
import LoggedInToolbar from "./components/LoggedInToolbar/LoggedInToolbar";
import Main from "./components/Main/Main";
import MainLogo from "./components/MainLogo/MainLogo";
import useLogin from "./hooks/useLogin";
import useProfileRequest from "./hooks/useProfileRequest";
import useFetchNews from "./hooks/useFetchNews";
import CardsList from "./components/CardList/CardsList";
import MyError from "./components/Error/MyError";
import { ISubmittedUserInfo } from "./models";
import MyLoader from "./components/Loader/MyLoader";

function App() {
  const [submittedData, setSubmittedData] = useState<ISubmittedUserInfo>({
    userLogin: "",
    userPassword: "",
  });

  const [{ isLogged, token, setIsLogged, isError, isLoading }] =
    useLogin(submittedData);
  const [{ userData, setShoulFetchData }] = useProfileRequest(isLogged, token);
  const [{ newsData }] = useFetchNews({ isLogged, token });

  const handleSumbit = (data: ISubmittedUserInfo) => {
    setSubmittedData(data);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setShoulFetchData(true);
    localStorage.clear();
  };

  return (
    <div>
      {isLoading && <MyLoader />}
      <Header>
        {isError.status && <MyError message={isError.message} />}
        <MainLogo>Neto Social</MainLogo>
        {isLogged && userData ? (
          <LoggedInToolbar
            userName={userData.name}
            userAvatar={userData.avatar}
            logoutHandler={handleLogout}
          />
        ) : (
          <FormHeader handleSumbit={handleSumbit} />
        )}
      </Header>
      <Main>
        {isLogged && newsData ? (
          <CardsList cards={newsData} />
        ) : (
          <div style={{ fontSize: "3rem", fontStyle: "italic" }}>
            Some information on the start page
          </div>
        )}
      </Main>
    </div>
  );
}

export default App;
