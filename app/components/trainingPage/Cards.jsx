"use client";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

function Cards({ week, days, checkedWeeks, setCheckedWeeks }) {
  const [checked, setChecked] = useState(false);
  const [expand, setExpand] = useState(false);
  week = week.replace(/\*/g, "");

  const expandCard = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    if (checked) {
      setCheckedWeeks((prev) => [...prev, week]);
    } else {
      setCheckedWeeks((prev) => prev.filter((item) => item !== week));
    }

    console.log(checkedWeeks);
  }, [checked]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div
      onClick={expandCard}
      className={`bg-white shadow-md p-4 rounded-md mb-4 transition-transform cursor-pointer hover:shadow-lg ${
        expand ? "scale-125 lg:scale-150" : ""
      }`}
    >
      <h2 className="text-xl font-medium mb-2 underline text-center">{week}</h2>
      {days.map((day, index) => (
        <p key={index} className="text-sm pb-1">
          &bull; {day.day}
        </p>
      ))}
      {/* <Checkbox onClick={() => setChecked(!checked)} {...label} /> */}
    </div>
  );
}

export default Cards;
