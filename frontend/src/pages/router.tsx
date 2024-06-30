import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { SignInPage } from "./signin";
import { SignUpPage } from "./signup";
import { RootPage } from "./root";
import { Protected } from "./protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/protected",
        element: <Protected />,
      },
    ],
  },
]);
