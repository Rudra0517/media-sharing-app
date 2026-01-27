import React, { useEffect, useState } from "react";
import { useAuth } from "../../contextApi/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMail } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { MdOutlineTransgender } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
const Profile = () => {
  const defaultImage = "https://wallpapercave.com/wp/wp8387365.jpg";

  const token = JSON.parse(localStorage.getItem("jwt_token"));
  const id = token.split(".")[1];

  const navigate = useNavigate();
  const { activeUser, logout } = useAuth();

  const fullName = `${activeUser.fname
    ?.slice(0, 1)
    .toUpperCase()}${activeUser.fname?.slice(1)} ${activeUser?.lname}`;
  const isImage = activeUser?.profile_url?.endsWith(
    ".png" || ".jpg" || ".jpeg" || ".img",
  );

  const avatar = isImage ? activeUser.profile_url : defaultImage;

  // delete profile
  const deleteProfile = async (id) => {
    try {
      if (confirm("Are you confirm want to delete profile??")) {
        const { data } = await axios.delete(
          `http://localhost:8080/allusers/${id}`,
        );
        toast.success("Account Deleted successfully", {
          position: "top-center",
        });
        localStorage.removeItem("jwt_token");
        logout();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-75px)] flex justify-center items-center ml-[250px]">
      <div className="w-[768px] h-[450px] rounded-[10px] shadow-lg flex flex-col dark:shadow-[0px_0px_8px_white] relative">
        <div className="w-full h-[180px] flex flex-col justify-end pb-4 items-center bg-[#6B76A4] rounded-t-[10px]">
          <div className="ml-[100px]">
            <p className="text-[2rem] font-sans text-[white] font-extrabold">
              {fullName.toUpperCase()}
            </p>
            <p className="text-[#ffffff] flex items-center gap-2 justify-center">
              <IoMail />
              {activeUser.mail}
            </p>
          </div>
        </div>
        <div className="absolute w-[130px] h-[130px] top-[115px] left-[100px]">
          <img
            src={avatar}
            alt=""
            className="rounded-full h-full w-full object-cover border-[8px] border-[white] "
          />
        </div>
        <div className="flex items-start pt-4 justify-center h-[270px] rounded-b-[10px] w-auto">
          <div className="h-[100px] w-200px flex flex-col items-start pl-[4rem] gap-2 justify-evenly">
            <p className="flex items-center gap-2 dark:text-white">
              <MdDateRange />
              {activeUser.DOB}
            </p>
            <p className="flex gap-2 items-center dark:text-white">
              <MdOutlineTransgender />
              {activeUser.gender}
            </p>
            <p className="flex gap-2 items-center dark:text-white">
              <FaAddressBook />
              {activeUser.course}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
