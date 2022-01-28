import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ChannelsPage from "../pages/ChannelsPage";
import LoginPage from "../pages/LoginPage";
import { privateRoutes, publicRoutes } from "./routes";

function AppRouter() {
  const { fetchUserData, isLoggedIn, isLoading } =
    React.useContext(AuthContext);
  React.useEffect(() => {
    if(localStorage.getItem("auth") === "true") fetchUserData();
  }, []);

  if (isLoading) return <>Loading...</>;

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          {privateRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
              exact={true}
            />
          ))}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
              exact={true}
            />
          ))}
          <Route path="*" element={<ChannelsPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
