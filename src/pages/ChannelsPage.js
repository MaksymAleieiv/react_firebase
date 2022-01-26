import React from "react";
import ChannelComponent from "../components/ChannelComponent";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

function ChannelsPage() {
  return (
    <div className="container">
      <LeftSideBarComponent />
      <div className="channelContainer">
        <ChannelComponent />
      </div>
    </div>
  );
}

export default ChannelsPage;
