import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    rePassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    for (let val in formData) {
      if (formData[val] === "") {
        setStatus(false);
        return;
      }
    }
    setStatus(true);
  }, [formData]);

  const { mail, password, rePassword } = formData;

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      if (password !== rePassword) {
        toast.error("confirm password is mismatched!!!", {
          position: "top-center",
        });
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/resetpassword",
        formData,
      );
      if (response.status === 200) {
        toast.success("Password reset successfully", {
          position: "top-center",
        });
        navigate("/login");
        return;
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network error");
        return;
      }
      if (error.response.status === 409) {
        toast.warning("User not exists", { position: "top-center" });
        return;
      }
      if (error.response.status === 500) {
        toast.warning("Internal server error please try again later", {
          position: "top-center",
        });
        return;
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[350px] w-[550px] rounded-xl flex flex-col justify-center items-center shadow-lg bg-yellow-50">
        <h1 className="text-[25px] font-bold">Reset Password</h1>
        <form
          action=""
          onSubmit={handleForm}
          className="h-[80%] w-[90%] flex flex-col justify-evenly gap-3"
        >
          <div>
            <label htmlFor="">Enter Mail Id</label>
            <input
              type="mail"
              placeholder="Enter your mail id"
              className="w-full rounded p-2 border-b-2 outline-none"
              name="mail"
              value={formData.mail}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="">Enter Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded p-2 border-b-2 outline-none"
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded p-2 border-b-2 outline-none"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleInput}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`bg-blue-600 px-3 py-2 rounded-md text-white font-mono  ${
                status ? "cursor-pointer" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!status}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
