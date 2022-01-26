import React from "react";
import ChannelComponent from "../components/ChannelComponent";
import { AuthContext } from "../contexts/AuthContext";
import { ChannelsContext } from "../contexts/ChannelsContext";

function ChannelsPage() {
  const { user, createNewChannel } = React.useContext(AuthContext);
  const { channels, unsubscribe, fetchChannelsData } =
    React.useContext(ChannelsContext);
  const [newChannelName, setNewChannelName] = React.useState("");

  React.useEffect(() => {
    fetchChannelsData(user.email.split("@")[1]);
    return () => unsubscribe.current();
  }, []);

  const [selectedChannel, setSelectedChannel] = React.useState(null);

  return (
    <div className="container">
      <div>
        <div>{user.email.split("@")[1]}</div>
        {channels &&
          channels.map((channel) => (
            <div key={channel.id} onClick={() => setSelectedChannel(channel)}>
              {channel.name}
            </div>
          ))}
        <button
          onClick={() =>
            createNewChannel(newChannelName, user.email.split("@")[1])
          }
        >
          Create Channel
        </button>
        <input
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        ></input>
      </div>
      <div>
        {selectedChannel ? (
          <ChannelComponent channel={selectedChannel}></ChannelComponent>
        ) : (
          <>Select a channel</>
        )}
      </div>
    </div>
  );
}

export default ChannelsPage;
