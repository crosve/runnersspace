import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {week}
      </Typography>
      {days.map((day, index) => {
        return (
          <Typography variant="body2" key={index}>
            {bull}
            {day.day}
          </Typography>
        );
      })}
    </CardContent>
  );
}

export default Cards;
