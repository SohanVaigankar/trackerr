import React from "react";

const Loader = () => {
  return (
    <div className="    w-full  text-primary-font flex justify-center items-center">
      <div className="spinner w-5 h-5 rounded-full border-solid border-[3px] border-[#c7c7c7] border-r-[#FAFAFA] animate-spin"></div>
    </div>
  );
};

export default Loader;