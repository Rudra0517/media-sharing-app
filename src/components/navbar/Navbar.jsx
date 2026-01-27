import React, { use, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contextApi/useTheme";
import { useAuth } from "../../contextApi/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, activeUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleInput = (e) => {
    const { value } = e.target;
    toggleTheme();
  };
  return (
    <nav className="h-[75px] w-full flex items-center bg-[white] justify-around font-mono z-10 dark:bg-[#0F1421] dark:text-white fixed top-0 shadow-md transition duration-3s ease-linear ">
      <div className="h-full w-[40%] flex items-center justify-evenly text-[1.1rem]">
        <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-blue-600 w-[22%]">
          <img
            src="https://res.cloudinary.com/zenbusiness/q_auto,w_1024/v1/logaster/logaster-2020-07-2-upwork-logo-1024x512.png"
            alt=""
          />
        </p>
        <ul className="w-[85%] h-full flex items-center justify-evenly">
          <li
            className="p-2 rounded-md font-bold hover:text-[royalblue]"
            title="home"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="p-2 rounded-md font-bold hover:text-[royalblue]"
            title="Dashboard"
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            className="p-2 rounded-md font-bold hover:text-[royalblue] cursor-pointer"
            title="about"
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className="p-2 rounded-md font-bold hover:text-[royalblue] cursor-pointer"
            title="contact"
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="w-[15%] h-full flex items-center justify-end">
        {!isLoggedIn ? (
          <button className=" w-[40%] h-[60%] flex items-center justify-center font-bold rounded-md bg-yellow-400 hover:bg-yellow-500">
            <Link to="/login" className="font-bold">
              Log In
            </Link>
          </button>
        ) : (
          <div
            className="w-[60px] h-[60px] flex items-center justify-center font-bold rounded-full bg-[#6B76A4] text-[2rem] cursor-pointer"
            title={`${activeUser.fname} ${activeUser.lname}`}
          >
            {`${activeUser.fname?.[0].toUpperCase()}${activeUser.lname?.[0].toUpperCase()}`}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
