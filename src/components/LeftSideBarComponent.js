import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChannelsContext } from "../contexts/ChannelsContext";
import AddNewSomething from "./AddNewSomething";

function LeftSideBarComponent() {
  const { user, signOut } = React.useContext(AuthContext);
  const {
    channels,
    unsubscribe,
    fetchChannelsData,
    createNewChannel,
    setSelectedChannel,
  } = React.useContext(ChannelsContext);

  React.useEffect(() => {
    fetchChannelsData(user.email.split("@")[1]);
    return () => unsubscribe.current();
  }, []);

  return (
    <div className="leftSidebar">
      <button className="signOutBtn" onClick={() => {
        signOut();
        setSelectedChannel(null)
      }}>Sign Out</button>
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
