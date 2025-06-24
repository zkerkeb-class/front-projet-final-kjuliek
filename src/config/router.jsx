import {
  createBrowserRouter,
} from "react-router";

import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import ProtectedRoutes from "../components/ProtectedRoutes";

let router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  // {
  //   path: "/signin",
  //   Component: SigninPage,
  // },
  {
    Component: ProtectedRoutes,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
  ]},
]);


export default router;