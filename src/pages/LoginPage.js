import React from "react";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const { loginWithGoogle } = React.useContext(AuthContext);
  return <div onClick={loginWithGoogle}>Login</div>;
}

export default LoginPage;
