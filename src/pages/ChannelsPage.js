import React from "react";
import ChannelComponent from "../components/ChannelComponent";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

function ChannelsPage() {
  return (
    <div className="container">
      <LeftSideBarComponent />
      <ChannelComponent />
    </div>
  );
}

export default ChannelsPage;
