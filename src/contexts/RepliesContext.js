import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FirebaseService from "../services/FirebaseService";

export const RepliesContext = React.createContext(null);

const RepliesContextProvider = ({ children }) => {
  const [replies, setReplies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const unsubscribe = React.useRef(null);

  const app = initializeApp({
    apiKey: "AIzaSyBF34IAiCdTu4WoEUC1Qk3kfunIU-z54dc",
    authDomain: "reactfirebaseprojectpog.firebaseapp.com",
    projectId: "reactfirebaseprojectpog",
    storageBucket: "reactfirebaseprojectpog.appspot.com",
    messagingSenderId: "260005780361",
    appId: "1:260005780361:web:ab03640ed2c3d19afe5f58",
  });

  const firestore = getFirestore(app);

  const fetchAllRepliesToPost = async (postId) => {
    let unsub = await FirebaseService.subscribeToReplies(
      firestore,
      postId,
      setReplies
    );
    unsubscribe.current = unsub;
  };

  const addReplyToPost = async (postId, body, userName) => {
    let replyData = {
      id: Date.now(),
      body,
      postId,
      userName,
    };
    await FirebaseService.addNewReplyToDB(firestore, replyData);
  };

  return (
    <RepliesContext.Provider
      value={{
        replies,
        isLoading,
        addReplyToPost,
        fetchAllRepliesToPost,
        unsubscribe,
      }}
    >
      {children}
    </RepliesContext.Provider>
  );
};

export default RepliesContextProvider;
