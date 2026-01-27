import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useAuth } from "../../contextApi/useAuth";
import { IoPersonSharp } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
const Sidebar = () => {
  const navigate = useNavigate();
  const { activeUser, setIsLoggedIn } = useAuth();
  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const css =
    "w-[90%] px-[2rem] py-3 my-1 flex items-center justify-start rounded-lg text-[white] text-center font-bold hover:bg-[#6a718b] text-black dark:text-white gap-2";

  return (
    <aside className="w-[250px] h-[89vh] bg-[white] dark:bg-[#0F1421] flex flex-col items-center justify-between shadow-md transition duration-3s ease-linear fixed">
      <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
        <div className="h-[100%] w-[100%] flex flex-col items-center justify-evenly">
          <div className="flex flex-col w-[90%] border-b-2 border-gray-300">
            <NavLink to={`/dashboard/profile`} className={css}>
              <IoPersonSharp /> My Profile
            </NavLink>

            <NavLink to={`/dashboard/updateprofile`} className={css}>
              <LiaUserEditSolid />
              Edit Profile
            </NavLink>
          </div>
          <div className="flex flex-col w-[90%] border-b-2 border-gray-300">
            <p className="px-5 text-[1rem] dark:text-white">POSTS</p>
            <NavLink to="/dashboard/createposts" className={`${css}`}>
              <FaPlus />
              Create Posts
            </NavLink>
            <NavLink to="/dashboard/myposts" className={css}>
              <FaRegImages />
              My Posts
            </NavLink>
          </div>
          <div className="flex flex-col w-[90%] border-b-2 border-gray-300">
            <NavLink to="/dashboard/setting" className={css}>
              <IoSettingsOutline />
              Setting
            </NavLink>
            <button className="w-[100%]">
              <NavLink to="/" onClick={logout} className={css}>
                <LuLogOut /> Log out
              </NavLink>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="w-[100%] h-[100px] flex flex-col items-center justify-center">
          <button className="bg-[#97dcd8a0] px-[2rem] py-2 rounded-lg text-[white] font-mono font-bold">
            <Link to="/login">Logout</Link>
          </button>
        </div> */}
    </aside>
  );
};

export default Sidebar;
