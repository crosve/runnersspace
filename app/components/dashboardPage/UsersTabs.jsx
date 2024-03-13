"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const tabs = [
  {
    label: "Your Training Plan",
  },
  {
    label: "Your Injury Prevention Plan",
  },
  {
    label: "Your Saved shoes",
  },
  {
    label: "Your Nutrition Plan",
  },
];

function UsersTabs({ info, setInfo }) {
  const [content, setContent] = useState(null);

  const { user } = useAuth();
  const handleShow = async (e) => {
    e.preventDefault();
    const target = e.target.textContent;

    if (target === "Your Training Plan") {
      try {
        const reponse = await fetch("api/usertraining", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });
        const data = await reponse.json();
        setInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (target === "Your Injury Prevention Plan") {
      console.log("Your Injury Prevention Plan");
    }
    if (target === "Your Saved shoes") {
      console.log("Your Saved shoes");
    }
    if (target === "Your Nutrition Plan") {
      console.log("Your Nutrition Plan");
    }
    console.log(user.uid);
    console.log("hey");
  };

  return (
    <div className="grid grid-rows-4 gap-8 mt-28 lg:mt-54">
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={(e) => handleShow(e)}
          className="bg-gray-100 p-4 text-center cursor-pointer hover:bg-gray-200"
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default UsersTabs;
