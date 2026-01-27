import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contextApi/useAuth";

const UpdateProfile = () => {
  const { setActiveUser, activeUser } = useAuth();
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

  const token = JSON.parse(localStorage.getItem("jwt_token"));

  const id = token.split(".")[1];

  const fdata = async () => {
    const { data } = await axios.get(`http://localhost:8080/allusers/${id}`);
    setFormData(data.data);
  };

  useEffect(() => {
    fdata();
  }, []);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: value, [checked]: value });
  };

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

  const handleForm = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("re-password is mismatched!!!", { position: "top-center" });
      return;
    }

    const finaldata = {
      fname,
      lname,
      mail,
      DOB,
      gender,
      course,
      profile_url,
      password,
      rePassword,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/allusers/${id}`,
        finaldata,
      );
      if (response.status === 200) {
        setActiveUser(response.data);
        toast.success("User data updated successfully.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProfile = async () => {
    // confirm FIRST
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?",
    );

    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/allusers/${id}`,
      );
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem("jwt_token");
        navigate("/login");

        toast.success("User deleted successfully.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete user.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="h-auto w-full flex items-center justify-center ml-[250px] mt-3">
      <form
        onSubmit={handleForm}
        className="w-[768px] space-y-4 rounded-[20px] p-6 shadow-lg flex flex-col dark:shadow-[1px_1px_5px_white]"
      >
        <h2 className="text-center text-3xl font-bold text-[black] dark:text-[white]">
          Update Profile
        </h2>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="fname"
            value={fname}
            onChange={handleInput}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="lname"
            value={lname}
            onChange={handleInput}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Mail
          </label>
          <input
            type="mail"
            placeholder="Enter your mail id"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="mail"
            value={mail}
            onChange={handleInput}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="DOB"
            value={DOB}
            onChange={handleInput}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Gender
          </label>
          <div className="w-full flex items-center justify-start gap-2 text-[1rem] dark:text-white">
            <input
              type="radio"
              value="male"
              name="gender"
              checked={gender === "male"}
              onChange={handleInput}
            />
            Male
            <input
              type="radio"
              value="female"
              name="gender"
              checked={gender === "female"}
              onChange={handleInput}
            />
            Female
            <input
              type="radio"
              value="other"
              name="gender"
              checked={gender === "other"}
              onChange={handleInput}
            />
            Other
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Course
          </label>
          <select
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none placeholder:text-[white]"
            name="course"
            onChange={handleInput}
            value={course}
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
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Profile image link
          </label>
          <input
            type="text"
            placeholder="Enter profile image link"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="profile_url"
            onChange={handleInput}
            value={profile_url}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="password"
            value={password}
            onChange={handleInput}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor=""
            className="block text-sm font-semibold mb-1 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="re-Enter password"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            name="rePassword"
            value={rePassword}
            onChange={handleInput}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 px-3 py-2 rounded-md text-white font-mono cursor-pointer"
        >
          SUBMIT
        </button>
        <button
          type="button"
          onClick={deleteProfile}
          className="bg-red-600 px-3 py-2 rounded-md text-white font-mono cursor-pointer"
        >
          DELETE PROFILE
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
