import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreatePosts = () => {
  const [status, setStatus] = useState(true);
  const [postData, setPostData] = useState({
    image_url: "",
    caption: "",
    hashtag: "",
    location: "",
  });
  const handlePostInput = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  useEffect(() => {
    for (let val in postData) {
      if (postData[val] === "") {
        setStatus(false);
        return;
      }
    }
    setStatus(true);
  }, [postData]);

  const handlePostForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/posts",
        postData
      );
      toast.success("Uploaded successfully!!!", { position: "top-center" });
      setPostData({
        image_url: "",
        caption: "",
        hashtag: "",
        location: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-75px)] bg-gray-100 flex flex-col items-center justify-center dark:bg-[#0F1421] transition duration-3s ease-linear ml-[250px]">
      <div className="h-[550px] w-[900px] flex flex-col bg-white items-center justify-center rounded-2xl shadow-lg dark:bg-[#0F1421] dark:shadow-[0.5px_0.5px_5px_white]">
        <form
          onSubmit={handlePostForm}
          className="h-full w-[800px] flex flex-col justify-evenly items-start"
        >
          <h1 className="text-[25px] font-bold dark:text-white">New Post</h1>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 dark:text-white">
              Upload Image URL
            </label>
            <input
              type="text"
              placeholder="image link"
              name="image_url"
              value={postData.image_url}
              onChange={handlePostInput}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 dark:text-white">
              Caption
            </label>
            <textarea
              rows="4"
              placeholder="Add captions..."
              name="caption"
              value={postData.caption}
              onChange={handlePostInput}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none resize-none"
            ></textarea>
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 dark:text-white">
              Hashtag
            </label>
            <input
              type="text"
              name="hashtag"
              value={postData.hashtag}
              onChange={handlePostInput}
              placeholder="Add tags separated by comma..."
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={postData.location}
              onChange={handlePostInput}
              placeholder="Enter Location"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={` bg-black px-5 border-2 py-1 font-semibold rounded-md hover:border-2 hover:border-black hover:bg-white hover:text-black  text-white dark:bg-white dark:text-black ${
              status ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!status}
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePosts;
