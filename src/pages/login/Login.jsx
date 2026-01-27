import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contextApi/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const { password, mail } = formData;

  const [status, setStatus] = useState(true);

  const { login, setActiveUser, activeUser } = useAuth();

  // handle inputs from the client
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // check input field isEmpty
  useEffect(() => {
    for (let val in formData) {
      if (formData[val] === "") {
        setStatus(false);
        return;
      }
    }
    setStatus(true);
  }, [formData]);

  // handle the form
  const formHandle = async (e) => {
    e.preventDefault();

    // fetching the data from the backend
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        formData,
      );

      const token = data.token;

      if (token) {
        localStorage.setItem("jwt_token", JSON.stringify(token));

        toast.success("Login successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setFormData({
          mail: "",
          password: "",
        });
        login();
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.warning("User Not found", {
          position: "top-center",
        });
      }
      console.log(error.message);
    }
  };
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#2a5f94]">
      <div className="h-[450px] w-[800px] flex flex-col md:flex-row items-center justify-evenly shadow-xl rounded-[20px] ">
        <div className="h-[100%] max-w-md rounded-s-[20px] flex justify-center items-center">
          <img
            className="h-auto"
            src="https://www.channelsoftech.com/images/landing-page/website-landing-page-design-in-bangalore.png"
            alt=""
          />
        </div>
        <form
          onSubmit={formHandle}
          className="w-[350px] space-y-4 h-[450px] rounded-[20px] p-6 flex flex-col items-center justify-center gap-4 bg-[#E5ECF7]"
        >
          <h2 className="text-3xl font-bold ">Log in</h2>
          <input
            type="mail"
            placeholder="Enter mail id"
            className="w-full rounded p-2 border-l-2 border-white outline-none"
            name="mail"
            value={formData.id}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full rounded  p-2 border-l-2 border-white outline-none"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <button
            type="submit"
            className={`bg-blue-600 px-3 py-2 rounded-md text-white font-mono  ${
              status ? "cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!status}
          >
            SUBMIT
          </button>
          <p className="">
            If you are not registered yet?
            <span className="text-[blue]">
              <Link to="/register">Register </Link>
            </span>
            here
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
