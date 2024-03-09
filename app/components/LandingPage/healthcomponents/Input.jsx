"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Input() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrompt = (e) => {
    e.preventDefault();
    if (response) {
      setResponse(null);
    }

    setLoading(true);
    console.log(loading);
    if (prompt === "") {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      fetch("/api/healthres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data.text);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setPrompt(e.target.value);
    if (prompt !== "") {
      setError(null);
    }
  };

  return (
    <>
      {error && <h2 className="text-center">{error}</h2>}
      <div className="h-1/2 w-full border-4 block">
        <TextField
          sx={{
            width: "100%",
            height: "100%",
          }}
          id="outlined-multiline-static"
          multiline
          rows={12}
          value={prompt}
          onChange={handleInput}
        />

        <div className="flex ">
          <Button
            className="text-black relative"
            sx={{
              width: "50%",
              height: "10%",
              fontWeight: "10px",
            }}
            variant="contained"
            onClick={(e) => handlePrompt(e)}
          >
            Ask
          </Button>
          <button
            onClick={() => setPrompt("")}
            className="w-1/2 flex items-center justify-center font-xl hover:bg-slate-400"
          >
            Clear
          </button>
        </div>
      </div>
      {loading && !response ? (
        <div className=" h-auto mt-28">
          <Skeleton count={8} />
        </div>
      ) : (
        <div className=" h-auto mt-28">
          <p className="text-sm bg-slate-300">{response}</p>{" "}
        </div>
      )}
    </>
  );
}

export default Input;
