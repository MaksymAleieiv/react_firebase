import React from "react";
import AuthContextProvider from "./contexts/AuthContext";
import ChannelsContextProvider from "./contexts/ChannelsContext";
import PostContextProvider from "./contexts/PostsContext";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import RepliesContextProvider from "./contexts/RepliesContext";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default () => (
  <AuthContextProvider>
    <ChannelsContextProvider>
      <PostContextProvider>
        <RepliesContextProvider>
          <App />
        </RepliesContextProvider>
      </PostContextProvider>
    </ChannelsContextProvider>
  </AuthContextProvider>
);
