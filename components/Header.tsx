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
