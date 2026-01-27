import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contextApi/useTheme";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col dark:bg-[#0F1421]">
      <Navbar />
      <button
        onClick={toggleTheme}
        className="w-[50px] h-[50px] flex items-center justify-center text-[30px] rounded-full bg-slate-700 ml-2 dark: text-[white] fixed bottom-6 right-6"
        title={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <Outlet />
    </div>
  );
};

export default Layout;
