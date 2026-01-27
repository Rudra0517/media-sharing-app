import React, { useState } from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    mail: "",
    DOB: "",
    gender: "",
    course: "",
    profile_url: "",
    password: "",
    rePassword: "",
  });

  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  );
};

export default App;
