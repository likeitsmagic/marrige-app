import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { RootPage } from "./root";
import { SignInOrSignUpPage } from "./signinorsignup";

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
        path: "/signin-or-signup",
        element: <SignInOrSignUpPage />,
      },
    ],
  },
]);
