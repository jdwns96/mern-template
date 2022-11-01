import Home from "./index";
import Signin from "./signin";

import NotFound from "./404";

interface Routes {
  key: number;
  path: string;
  Component: () => JSX.Element;
}

export const authRoutes: Routes[] = [];

export const routes: Routes[] = [
  {
    key: 1,
    path: "/",
    Component: Home,
  },
  {
    key: 2,
    path: "/signin",
    Component: Signin,
  },

  {
    key: 404,
    path: "*",
    Component: NotFound,
  },
];
