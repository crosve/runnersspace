"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Input() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handlePrompt = (e) => {
    e.preventDefault();
    if (prompt === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      const reponse = fetch("/api/healthres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((res) => res.json())
        .then((data) => setResponse(data.text));
    } catch (error) {
      console.log(error);
    }

    console.log(prompt);
  };

  return (
    <>
      {error && <h2>{error}</h2>}
      <div className="h-80 w-fit border-4">
        <TextField
          sx={{
            width: "100%",
            height: "100%",
          }}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={12}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Button
          className="text-black relative"
          sx={{
            width: "100%",
            height: "10%",
            fontWeight: "10px",
          }}
          variant="contained"
          onClick={(e) => handlePrompt(e)}
        >
          Submit
        </Button>
      </div>

      {response && (
        <div className=" h-auto mt-28">
          <p className="text-sm">{response}</p>{" "}
        </div>
      )}
    </>
  );
}

export default Input;
