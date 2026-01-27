import React, { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../contextApi/useAuth";
import { FaLocationDot } from "react-icons/fa6";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const { activeUser } = useAuth();
  const [likedPosts, setLikedPosts] = useState({});
  const fdata = async () => {
    const { data } = await axios.get("http://localhost:3000/posts");
    setPosts(data);
  };

  useEffect(() => {
    fdata();
  }, []);

  useEffect(() => {}, [posts]);

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-start dark:bg-[#0F1421] transition duration-3s ease-linear ml-[250px]">
      {posts.map((ele) => {
        return (
          <div
            key={ele.id}
            className="h-[450px] w-[768px] flex flex-col bg-white items-center justify-center rounded-2xl shadow-lg dark:bg-[#0F1421] dark:shadow-[0.5px_0.5px_5px_white] mt-5
          "
          >
            <div className="h-[60px] w-full flex items-center justify-start px-5">
              <img
                src="https://wallpapercave.com/wp/wp8387365.jpg"
                className="h-[40px] w-[40px] rounded-full object-fill"
                alt=""
              />
              <div className="h-full w-auto flex flex-col justify-center items-start ml-3">
                <p className="dark:text-[white]">{`@${activeUser.fname}`}</p>
                <p className="text-[13px] dark:text-[white] flex items-center justify-center hover:cursor-pointer">
                  <FaLocationDot />
                  {`${ele.location}`}
                </p>
              </div>
            </div>
            <div
              className="h-[270px] w-full flex items-center justify-center"
              onDoubleClick={() => toggleLike(ele.id)}
            >
              <img
                src="https://wallpapercave.com/wp/wp8387365.jpg"
                alt=""
                className="h-full"
              />
            </div>
            <div className="h-[100px] w-full flex flex-col justify-evenly pl-6 items-start">
              <div className="flex w-[300px] items-center justify-evenly">
                <span className="flex items-center justify-evenly w-[20%] dark:text-[white] hover:cursor-pointer">
                  <p className={`${likedPosts[ele.id] ? "text-[red]" : ""} `}>
                    <GoHeartFill />
                  </p>
                  Like
                </span>
                <span className="flex items-center justify-evenly w-[33%] dark:text-[white] hover:cursor-pointer">
                  <BiSolidCommentDetail />
                  Comment
                </span>
                <span className="flex items-center justify-evenly w-[25%] dark:text-[white] hover:cursor-pointer">
                  <FaShareAlt />
                  Share
                </span>
              </div>
              <span className="ml-6">
                <p className="dark:text-[white]">{ele.caption}</p>
                <p className="text-[blue] hover:cursor-pointer">{`${ele.hashtag
                  .split(",")
                  .map((ele) => `#${ele}`)
                  .join(" ")}`}</p>
                <p className="dark:text-[white]"></p>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPosts;
