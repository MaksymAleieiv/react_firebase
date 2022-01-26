import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FirebaseService from "../services/FirebaseService";

export const ChannelsContext = React.createContext(null);

const ChannelsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [channels, setChannels] = React.useState([]);
  const [selectedChannel, setSelectedChannel] = React.useState(null);
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

  const createNewChannel = (name, provider) => {
    if (name.length > 0) {
      let channelData = {
        id: Date.now(),
        name,
        provider,
      };
      FirebaseService.addNewChannelToDB(firestore, channelData);
    }
  };

  const fetchChannelsData = async (provider) => {
    let unsub = await FirebaseService.subscribeToChannels(
      firestore,
      provider,
      setChannels,
      unsubscribe
    );
    unsubscribe.current = unsub;
  };

  return (
    <ChannelsContext.Provider
      value={{
        isLoading,
        channels,
        unsubscribe,
        selectedChannel,
        setSelectedChannel,
        createNewChannel,
        fetchChannelsData,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsContextProvider;
