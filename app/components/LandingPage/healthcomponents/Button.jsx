"use client";
import React from "react";

function Button() {
  const moveDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={moveDown}
      className="border-2 h-fit w-fit p-2 mt-4 rounded-md hover:bg-slate-100 text-gray-800 text-lg shadow-md"
    >
      Explore
    </button>
  );
}

export default Button;
