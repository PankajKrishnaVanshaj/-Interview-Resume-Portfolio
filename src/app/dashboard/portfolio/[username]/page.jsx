import React from "react";
import About from "../_components/About";
import Skills from "../_components/Skills";
import MyApps from "../_components/MyApps";

const Username = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white">
      <div className="mb-10">
        <About />
      </div>

      {/* My Skills & Projects section */}
      <div className="mt-10">
        <div className="flex items-center justify-center text-2xl md:text-3xl font-extrabold text-gray-800">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 px-2 bg-white rounded-lg tracking-[2px]">
            My Skills & Projects
          </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-10 space-y-10 md:space-y-0 md:space-x-5">
          <div className="w-full md:w-1/2">
            <Skills />
          </div>
          <div className="w-full md:w-1/2">
            <MyApps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
