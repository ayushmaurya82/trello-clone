"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { boardActions } from "@/reducer/boardReducer";

const Header = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const documents = [
      {
        $id: "shdg762vs26t3",
        image: null,
        status: "todo",
        title: "Implement dark mode feature",
        description:
          "Design UI elements for dark mode compatibility. Write CSS styles for dark theme support. Test and adjust contrast ratios for readability",
      },
      {
        $id: "35687gyh78",
        image: null,
        status: "todo",
        title: "Enhance user profile settings",
        description:
          "Redesign profile page layout for improved usability. Add new settings options for customization. Validate input fields and provide error feedback.",
      },
      {
        $id: "shdg762vs26t4",
        image: null,
        status: "inprogress",
        title: "Optimize page load performance",
        description:
          "Analyze current performance metrics using Lighthouse. Minify and compress CSS and JavaScript files. Implement lazy loading for images and resources.",
      },
      {
        $id: "shdg762vs26t5",
        image: null,
        status: "inprogress",
        title: "Develop RESTful API endpoints",
        description:
          "Design API routes for user authentication and authorization. Implement token-based authentication using JWT. Write middleware for request validation and error handling.",
      },
      {
        $id: "hgt7934re87yu345",
        status: "inprogress",
        title: "Revamp user dashboard interface",
        description:
          "Redesign the user dashboard interface to improve user experience and accessibility. Implement intuitive navigation and organize information for better readability. Incorporate interactive elements for enhanced user engagement.",
      },
      {
        $id: "98bhukg57678bv",
        status: "done",
        title: "Implement local storage in UI",
        description:
          "Implement local storage in the user interface to ensure that user data is securely stored and remains accessible even after the page is refreshed. This feature will enhance user experience by preventing data loss and providing a seamless browsing experience.",
      },
      {
        $id: "8978y867f5g78",
        status: "done",
        title: "Design landing page layout",
        description:
          "Create wireframes for desktop and mobile views. Incorporate user-friendly navigation. Ensure responsive design for various screen sizes",
      },
    ];

    if (!localStorage.getItem("documents"))
      localStorage.setItem("documents", JSON.stringify(documents));
  }, []);

  useEffect(() => {
    dispatch(boardActions.searchTask(searchData));
  }, [dispatch, searchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trillo Logo"
          width={300}
          height={100}
          priority
          className="w-44 md:wd-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <SearchIcon className="h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              onChange={handleChange}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          <Avatar name="Roman Reigns" round size="50" color="#0055D1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
