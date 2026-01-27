import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoute from "../privateroute/PrivateRoute";
import UpdateProfile from "../pages/updateprofile/UpdateProfile";
import Setting from "../pages/setting/Setting";
import Profile from "../pages/profile/Profile";
import AuthRouting from "../privateroute/AuthRouting";
import CreatePosts from "../pages/posts/CreatePosts";
import MyPosts from "../pages/posts/MyPosts";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import ErrorPage from "../pages/errorpage/ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <AuthRouting>
            <Home />
          </AuthRouting>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Details />,
          },
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/updateprofile",
            element: <UpdateProfile />,
          },
          {
            path: "/dashboard/setting",
            element: <Setting />,
          },
          {
            path: "/dashboard/createposts",
            element: <CreatePosts />,
          },
          {
            path: "/dashboard/myposts",
            element: <MyPosts />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
