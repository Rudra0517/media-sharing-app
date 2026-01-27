import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contextApi/useAuth";
import axios from "axios";

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));

  if (!token) {
    return <Navigate to="/login" />;
  }
  const id = token.split(".")[1];

  const { setActiveUser } = useAuth();

  const fdata = async () => {
    const { data } = await axios.get(`http://localhost:8080/allusers/${id}`);
    setActiveUser(data.data);
  };

  useEffect(() => {
    fdata();
  }, [token]);

  return (
    <div className="flex h-auto w-full mt-[75px] bg-[white] dark:bg-[#0F1421]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
