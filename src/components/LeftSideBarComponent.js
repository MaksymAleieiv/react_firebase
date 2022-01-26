import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChannelsContext } from "../contexts/ChannelsContext";
import { PostContext } from "../contexts/PostsContext";
import AddNewSomething from "./AddNewSomething";

function LeftSideBarComponent() {
  const { user } = React.useContext(AuthContext);
  const {
    channels,
    unsubscribe,
    fetchChannelsData,
    createNewChannel,
    setSelectedChannel,
  } = React.useContext(ChannelsContext);
  const { setPosts, setSelectedPost } = React.useContext(PostContext);

  React.useEffect(() => {
    fetchChannelsData(user.email.split("@")[1]);
    return () => unsubscribe.current();
  }, []);

  return (
    <div className="leftSidebar">
      <h2 className="currentProviderName">
        Provider: @{user.email.split("@")[1]}
      </h2>
      <ul className="channelList">
        {channels &&
          channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => {
                setSelectedChannel(channel);
                setSelectedPost(null);
                setPosts([]);
              }}
            >
              {channel.name}
            </li>
          ))}
      </ul>

      <AddNewSomething
        func={createNewChannel}
        otherFuncOptions={[user.email.split("@")[1]]}
        placeholder={"Enter Channel name..."}
        btnText={"Create Channel"}
        className={"addNewChannel"}
      />
    </div>
  );
}

export default LeftSideBarComponent;
