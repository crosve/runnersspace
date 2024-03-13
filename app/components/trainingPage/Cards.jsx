import React from "react";

import Box from "@mui/material/Box";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Cards({ week, days }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-md mb-4">
      <h2 className="text-lg font-medium mb-2">{week}</h2>
      {days.map((day, index) => (
        <p key={index} className="text-sm">
          &bull; {day.day}
        </p>
      ))}
    </div>
  );
}

export default Cards;
