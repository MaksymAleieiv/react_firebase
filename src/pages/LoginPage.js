import React from "react";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const { loginWithGoogle } = React.useContext(AuthContext);
  return <div className="loginBtnHolder"><button onClick={loginWithGoogle} className="loginBtn">Login</button></div>;
}

export default LoginPage;
