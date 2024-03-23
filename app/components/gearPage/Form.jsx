"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You clicked submit.");
  };
  return (
    <form className="flex justify-between w-full gap-2">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </form>
  );
}

export default Form;
