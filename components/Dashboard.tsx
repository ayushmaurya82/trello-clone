import React from "react";
import Board from "./Board";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";

const Dashboard = () => {
  return (
    <div className="flex flex-grow-1 overflow-auto" style={{ height: "auto" }}>
      <div
        className="flex flex-col items-center space-x-3 hidden md:block"
        style={{
          background: "linear-gradient(to bottom, #de5c9d, #3377da)",
          minWidth: "60px",
        }}
      >
        <div className="bg-cyan-500 text-white p-2 rounded-sm cursor-pointer w-12 mt-3">
          <hr />
          <i>ACM</i>
          <hr />
        </div>
        <div className="mt-4">
          <KeyboardDoubleArrowRightOutlinedIcon className="text-white cursor-pointer" />
        </div>
      </div>
      <div className="flex sm:block lg:flex-col justify-center">
        <div className="flex ml-5 hidden  md:pt-5 text-white font-bold text-xl  md:block ">
          <div className="flex flex-row space-x-3">
            <div>Project Team Sprint</div>
            <div className="bg-gray-600/10 p-1 rounded-md cursor-pointer w-10 h-10 flex items-center justify-center">
              <StarBorderPurple500OutlinedIcon
                className="text-warning w-full h-6 w-6"
                style={{ color: "yellow" }}
              />
            </div>
            <div>|</div>
            <div className="bg-gray-600/10 p-1 pl-3 pr-3 rounded-md font-normal flex items-center justify-center">
              ACME Inc.
            </div>
            <div>|</div>
            <div className="bg-gray-600/10 p-1 pl-3 pr-3 rounded-md font-normal flex items-center justify-center">
              Invite
            </div>
          </div>
        </div>
        <Board />
      </div>
    </div>
  );
};

export default Dashboard;
