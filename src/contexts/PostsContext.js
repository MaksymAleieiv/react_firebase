import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FirebaseService from "../services/FirebaseService";

export const PostContext = React.createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = React.useState([]);
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

  const fetchAllPostsInChannel = async (channelId) => {
    let unsub = await FirebaseService.subscribeToPostsInChannel(
      firestore,
      channelId,
      setPosts
    );
    unsubscribe.current = unsub;
  };

  const addPostInChannel = async (channelId, subject, body, userName) => {
    let postData = {
      id: Date.now(),
      body,
      subject,
      channelId,
      userName,
    };
    await FirebaseService.addNewPostToDB(firestore, postData);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        isLoading,
        addPostInChannel,
        fetchAllPostsInChannel,
        unsubscribe,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
