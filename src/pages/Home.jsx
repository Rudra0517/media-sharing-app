import React from "react";
import { useAuth } from "../contextApi/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-75px)] w-full mt-[75px] bg-[white] dark:bg-[#0F1421]">
      <div className="h-[350px] w-[100%] flex items-center justify-end">
        <div className="h-[100%] w-[48%] flex flex-col justify-center items-start px-[3rem]">
          <h1 className="text-[3.5rem] font-sans font-bold text-start text-[#45291B] dark:text-[white]">
            Design to Growth Your Product...
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#6FDB42] text-[white] px-2 py-3 rounded-lg font-mono text-[1.3rem] flex items-center justify-evenly font-bold w-[200px] hover:bg-[#44b713]"
          >
            Get Started
            <FaArrowRightLong />
          </button>
        </div>
        <div className="h-[100%] w-[48%] flex items-center justify-center">
          <img
            src="https://lh6.googleusercontent.com/proxy/Pg-JR-xIShVDL4OW-QfCJHH8XfeewxEOv2mqjieLzc9s1AZrW-W7WEQOSFxaR1FaCO7cmQxULVTX9Owj8zmnQ9vBmcPFV7HwyGVc829EJf4czm65W-HATPt9-IhGTaIL8t7wia6OEA"
            alt=""
          />
        </div>
      </div>
      <div className="h-[300px] w-[100%] flex justify-evenly items-center">
        <div className="h-[100%] w-[48%] flex items-center justify-center">
          <img
            src="https://www.dswtechnologies.com/wp-content/themes/dswt/images/high-converting-1.png"
            alt=""
            className="h-[250px]"
          />
        </div>
        <div className="h-[100%] w-[48%] flex items-start justify-center gap-3 flex-col">
          <p className="w-[100%] text-[#45291B] dark:text-[white] font-sans font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas
            quidem ipsam ab dicta, repellendus repudiandae eaque placeat
            inventore consectetur dignissimos sapiente tempora autem? At porro
            suscipit laboriosam quae quo!
          </p>
          <button className="border-[1px] border-[black] px-2 py-3 rounded-lg font-mono text-[1.3rem] flex items-center justify-evenly font-bold w-[200px] dark:text-[white] dark:border-[white]">
            Learn More
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
