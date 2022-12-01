import HomePage from "./index";
import SigninPage from "./signin";

import ChatPage from "./chat";

import UserIdPage from "./[user_id]";
import UserFolloweePage from "./[user_id]/followee";
import UserFollowingPage from "./[user_id]/following";

import AccountPage from "./account";

import NotFound from "./404";

interface Routes {
  key: number;
  path: string;
  Component: () => JSX.Element;
}

export const routes: Routes[] = [
  {
    key: 1,
    path: "/",
    Component: HomePage,
  },
  {
    key: 2,
    path: "/signin",
    Component: SigninPage,
  },
  {
    key: 3,
    path: "/user/:user_id",
    Component: UserIdPage,
  },
  {
    key: 4,
    path: "/user/:user_id/followee",
    Component: UserFolloweePage,
  },
  {
    key: 5,
    path: "/user/:user_id/following",
    Component: UserFollowingPage,
  },
  {
    key: 6,
    path: "/account",
    Component: AccountPage,
  },
  {
    key: 7,
    path: "/chat",
    Component: ChatPage,
  },

  {
    key: 404,
    path: "*",
    Component: NotFound,
  },
];
