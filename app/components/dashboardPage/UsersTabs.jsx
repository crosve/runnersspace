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
    label: "Pace Calculator",
  },
];

function UsersTabs({ info, setInfo, setInjuryInfo, setShoes }) {
  const [content, setContent] = useState(null);

  const { getUserTrainingPlan, getUserInjuryPlan, getShoes } = useAuth();
  const handleShow = async (e) => {
    e.preventDefault();
    const target = e.target.textContent;

    if (target === "Your Training Plan") {
      try {
        const data = await getUserTrainingPlan();
        setInfo(data);
        setInjuryInfo(null);
        setShoes(null);
      } catch (error) {
        console.log(error);
      }
    }
    if (target === "Your Injury Prevention Plan") {
      try {
        const data = await getUserInjuryPlan();
        setInjuryInfo(data);
        setInfo(null);
        setShoes(null);
      } catch (error) {
        console.log(error);
      }
    }
    if (target === "Your Saved shoes") {
      try {
        const data = await getShoes();
        setShoes(data);
        setInjuryInfo(null);
        setInfo(null);
      } catch (error) {
        console.log(error);
      }
    }
    if (target === "Your Nutrition Plan") {
      console.log("Your Nutrition Plan");
    }
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
