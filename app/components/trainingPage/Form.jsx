"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const levels = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

const goals = [
  {
    value: "Mile",
    label: "Mile",
  },
  {
    value: "5k",
    label: "5k",
  },
  {
    value: "10k",
    label: "10k",
  },
  {
    value: "Half Marathon",
    label: "Half Marathon",
  },
  {
    value: "Marathon",
    label: "Marathon",
  },
  {
    label: "For Fun",
    value: "For Fun",
  },
];

function Form() {
  const [goalTime, setGoalTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [level, setLevel] = useState("");
  const [event, setEvent] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [plan, setPlan] = useState("");

  const handleGoalTimeChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    console.log(goalTime);

    const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
    if (regex.test(inputValue)) {
      setGoalTime(inputValue);
    }
  };

  const handleCurrentTimeChange = (event) => {
    setCurrentTime(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalTime === "" || level === "" || event === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      fetch("/api/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goalTime,
          currentTime,
          level,
          event,
          additionalInfo,
        }),
      })
        .then((res) => res.json())
        .then((data) => setPlan(data.text));
      console.log(plan);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} sx={{ width: "300px" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={levels}
          onChange={(e) => setLevel(e.target.value)}
          renderInput={(params) => <TextField {...params} label="Levels" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={goals}
          onChange={(e) => setEvent(e.target.value)}
          renderInput={(params) => <TextField {...params} label="Event" />}
        />
        <TextField
          label="Goal Time"
          variant="outlined"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Current Time (if applicable)"
          variant="outlined"
          value={currentTime}
          onChange={handleCurrentTimeChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Additional Information"
          multiline
          rows={4}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <p className="text-sm italic">
          *Information in thie field can be about what training has worked for
          you in the past. This will help us create a training plan better
          suited for you
        </p>
        <button
          type="submit"
          className="rounded text-black px-4 py-2 shadow-md hover:bg-slate-200"
        >
          Submit
        </button>
      </Stack>
    </form>
  );
}

export default Form;
