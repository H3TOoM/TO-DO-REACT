import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const Popup = ({ error, setError }) => {
  const closePopup = () => {
    setError(false);
  };
  return (
    <div
      className={`${
        error ? "flex" : "hidden"
      } flex-col justify-center items-center gap-2 bg-[#ECEFCA] p-1 w-[300px] h-[150px] rounded-xl absolute `}
    >
      <h1 className="text-[50px] text-[#213448]">
        <MdErrorOutline />
      </h1>

      <p className="text-md text-[#213448]">You Don't add any Task!</p>
      <button
        className="add px-5 py-1 rounded-xl cursor-pointer"
        onClick={closePopup}
      >
        Close
      </button>
    </div>
  );
};

export default Popup;
