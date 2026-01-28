import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import sendMessageViaMail from "../../../backend/config/email";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [status, setStatus] = useState(true);
  const {
    fname,
    lname,
    mail,
    DOB,
    gender,
    course,
    profile_url,
    password,
    rePassword,
  } = formData;

  // handling the inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // check is there any empty field
  useEffect(() => {
    for (let val in formData) {
      if (formData[val] === "") {
        setStatus(false);
        return;
      }
    }
    setStatus(true);
  }, [formData]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error("re-password is mismatched!!!", { position: "top-center" });
      return;
    }

    try {
      const data = await axios.post("http://localhost:8080/register", formData);
      toast.success("Registered successfully", { position: "top-center" });
      setFormData({
        fname: "",
        lname: "",
        mail: "",
        DOB: "",
        gender: "",
        profile_url: "",
        course: "",
        password: "",
        rePassword: "",
      });
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        toast.warning("You are already registered!!!", {
          position: "top-center",
        });
        navigate("/login");
        return;
      } else {
        toast.error("Server not responding", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#E5ECF7]">
      <div className="h-auto w-auto flex items-center justify-center shadow-xl rounded-[20px]">
        <img
          className="w-[500px]"
          src="https://www.re-view.design/wp-content/uploads/2024/09/Why-Landing-Page-Design-Is-More-Important-Than-You-Think.gif"
          alt=""
        />
        <form
          onSubmit={handleForm}
          className="w-[350px] space-y-4 rounded-[20px] p-6 flex flex-col items-center justify-center bg-[#E5ECF7]"
        >
          <h2 className="text-center text-3xl font-bold underline text-[#95C01F]">
            Register
          </h2>
          <input
            type="text"
            placeholder="Enter first name"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="fname"
            value={formData.fname}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Enter last name"
            className="w-full rounded  p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="lname"
            value={formData.lname}
            onChange={handleInput}
          />
          <input
            type="mail"
            placeholder="Enter your mail id"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="mail"
            value={formData.mail}
            onChange={handleInput}
          />
          <input
            type="date"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none font-mono bg-transparent"
            name="DOB"
            value={formData.DOB}
            onChange={handleInput}
          />

          <div className="w-full flex justify-start px-3 gap-3 py-2 border-b-2 border-[green] rounded-md text-[18px] items-center">
            <input
              type="radio"
              value="male"
              name="gender"
              checked={formData.gender === "male"}
              onChange={handleInput}
            />
            Male
            <input
              type="radio"
              value="female"
              name="gender"
              checked={formData.gender === "female"}
              onChange={handleInput}
            />
            Female
            <input
              type="radio"
              value="other"
              name="gender"
              checked={formData.gender === "other"}
              onChange={handleInput}
            />
            Other
          </div>
          <select
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="course"
            onChange={handleInput}
            value={formData.course}
          >
            <option>Select Course</option>
            <option value="MERN">MERN</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="Testing">Testing</option>
            <option value="DevOps">AI&ML</option>
            <option value="DevOps">DevOps</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Science">Data Science</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Data Structures">Data Structures</option>
          </select>

          <input
            type="text"
            placeholder="Enter profile image link"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="profile_url"
            value={formData.profile_url}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="re-Enter password"
            className="w-full rounded p-2 border-b-2 border-[green] outline-none bg-transparent"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleInput}
          />

          <button
            type="submit"
            className={`bg-blue-600 px-3 py-2 rounded-md font-mono ${
              status ? "cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!status}
          >
            SUBMIT
          </button>
          <p className="">
            Already have an account?
            <span className="text-[blue]">
              <Link to="/login">Signin </Link>
            </span>
            here
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
