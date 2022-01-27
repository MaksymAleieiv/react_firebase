import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import FirebaseService from "../services/FirebaseService";

export const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const app = initializeApp({
    apiKey: "AIzaSyBF34IAiCdTu4WoEUC1Qk3kfunIU-z54dc",
    authDomain: "reactfirebaseprojectpog.firebaseapp.com",
    projectId: "reactfirebaseprojectpog",
    storageBucket: "reactfirebaseprojectpog.appspot.com",
    messagingSenderId: "260005780361",
    appId: "1:260005780361:web:ab03640ed2c3d19afe5f58",
  });

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const googleAuthDataToUserData = (googleAuthData) => {
    return {
      uid: googleAuthData.uid,
      email: googleAuthData.email,
      name: googleAuthData.displayName,
    };
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
      let userData = googleAuthDataToUserData(user);
      setUser(userData);
      FirebaseService.addCurrentUserToDB(firestore, userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const signOut = async () => {
    auth.signOut().finally(() => {
      setIsLoggedIn(false);
      setUser(null);
    })
  };

  const fetchUserData = () => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        let userData = googleAuthDataToUserData(user);
        setUser(userData);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        isLoggedIn,
        isLoading,
        loginWithGoogle,
        fetchUserData,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
