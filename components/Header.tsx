"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { boardActions } from "@/reducer/boardReducer";
import AppsIcon from "@mui/icons-material/Apps";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Header = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(boardActions.searchTask(searchData));
  }, [dispatch, searchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleClick = () => {
    dispatch(boardActions.setNewTaskType("todo"));
    dispatch(boardActions.toggleModal());
  };

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-3 bg-gray-500/10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>

        <div className="flex" style={{ width: "600px" }}>
          <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer mr-2">
            <AppsIcon className="text-white w-full h-8" />
          </div>
          <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer mr-2">
            <HomeOutlinedIcon className="text-white w-full h-8" />
          </div>
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Search"
              className="outline-none p-0"
              onChange={handleChange}
            />
            <SearchIcon className="h-6 w-6 text-gray-500" />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center w-40">
          <Image
            src="https://links.papareact.com/c2cdd5"
            alt="Trillo Logo"
            width={300}
            height={20}
            layout="fixed"
            priority
            className="w-44 md:w-56 pb-10 md:pb-0 object-contain mx-auto flex justify-center"
          />
        </div>

        <div
          className="flex items-center space-x-2 justify-end w-full"
          style={{ width: "600px" }}
        >
          <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer">
            <AddOutlinedIcon
              onClick={handleClick}
              className="text-white w-full h-8"
            />
          </div>
          <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer">
            <InfoOutlinedIcon className="text-white w-full h-8" />
          </div>
          <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer">
            <NotificationsOutlinedIcon className="text-white w-full h-8" />
          </div>
          <Avatar name="Roman Reigns" round size="40" color="#0055D1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
