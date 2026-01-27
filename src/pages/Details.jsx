import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contextApi/GlobalContext";
import { useAuth } from "../contextApi/useAuth";
import axios from "axios";

const Details = () => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));
  const id = token.split(".")[1];
  const { logout, setActiveUser, activeUser } = useAuth();

  const fdata = async () => {
    const { data } = await axios.get(`http://localhost:8080/allusers/${id}`);
    setActiveUser(data);
  };


  useEffect(() => {
    fdata();
  }, []);

  return (
    <div className="h-[calc(100vh-75px)] w-full flex justify-center items-center ml-[250px]">
      <h1 className="text-4xl">{`Welcome ${activeUser.fname} ${activeUser.lname}`}</h1>
    </div>
  );
};

export default Details;
