import Login from "../pages/LoginPage";
import Channels from "../pages/ChannelsPage";

export const publicRoutes = [
  {
    path: "LOGIN_PAGE",
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: "CHANNELS_PAGE",
    Component: Channels,
  },
];
