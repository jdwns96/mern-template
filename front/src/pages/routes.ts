import HomePage from "./index";
import SigninPage from "./signin";

import UserIdPage from "./[user_id]";
import UserFolloweePage from "./[user_id]/followee";
import UserFollowingPage from "./[user_id]/following";
import AccountEditPage from "./account/edit";

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
    path: "/:user_id",
    Component: UserIdPage,
  },
  {
    key: 4,
    path: "/:user_id/followee",
    Component: UserFolloweePage,
  },
  {
    key: 5,
    path: "/:user_id/following",
    Component: UserFollowingPage,
  },
  {
    key: 7,
    path: "/account/edit",
    Component: AccountEditPage,
  },

  {
    key: 404,
    path: "*",
    Component: NotFound,
  },
];
