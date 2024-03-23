"use client";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Cards({ week, days, checkedWeeks, setCheckedWeeks }) {
  const [checked, setChecked] = useState(false);

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
    <div className="bg-white shadow-md p-4 rounded-md mb-4">
      <h2 className="text-lg font-medium mb-2">{week}</h2>
      {days.map((day, index) => (
        <p key={index} className="text-sm">
          &bull; {day.day}
        </p>
      ))}
      {/* <Checkbox onClick={() => setChecked(!checked)} {...label} /> */}
    </div>
  );
}

export default Cards;
