"use client";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Cards from "@/app/components/trainingPage/Cards";

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

const splitPlan = ({ trainingPlanText }) => {
  const weeksText = trainingPlanText.split("\n\n");

  const trainingPlan = [];
  for (let i = 0; i < weeksText.length; i += 2) {
    const week = weeksText[i];
    const days = weeksText[i + 1];
    if (days === undefined) break;
    const weekDays = days.split("\n");
    const weekDaysArray = [];
    weekDays.map((day, index) => {
      weekDaysArray.push({ day, index });
    });

    trainingPlan.push({ week, days: weekDaysArray });
  }

  return trainingPlan;
};

function Form() {
  const [goalTime, setGoalTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [level, setLevel] = useState("");
  const [event, setEvent] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(plan);
  }, [plan]);

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
    let plan = [];
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
        .then((data) => {
          if (data && data.text) {
            console.log(data.text);
            const trainingPlanText = data.text;
            plan = splitPlan({ trainingPlanText });
            setPlan(plan);
            setLoading(true);
          } else {
            console.error("Invalid data received from API:", data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Stack spacing={2}>
            <Autocomplete
              disablePortal
              options={levels}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => setLevel(value?.value || "")}
              renderInput={(params) => <TextField {...params} label="Levels" />}
            />
            <Autocomplete
              disablePortal
              options={goals}
              onChange={(event, value) => setEvent(value.value)}
              renderInput={(params) => <TextField {...params} label="Event" />}
            />
            <TextField
              label="Goal Time"
              variant="outlined"
              value={goalTime}
              onChange={(e) => setGoalTime(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
            <TextField
              label="Current Time (if applicable)"
              variant="outlined"
              value={currentTime}
              onChange={handleCurrentTimeChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
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
              *Information in this field can be about what training has worked
              for you in the past. This will help us create a training plan
              better suited for you
            </p>
            <button
              type="submit"
              className="rounded text-black px-4 py-2 shadow-md hover:bg-slate-200"
            >
              Submit
            </button>
          </Stack>
        </form>

        {loading && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1>Training Plan</h1>
            {plan.map((week, index) => (
              <Cards key={index} week={week.week} days={week.days} />
            ))}
          </div>
        )}
      </>
      {/* <form onSubmit={handleSubmit}>
        <Stack spacing={1} sx={{ width: "300px" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={levels}
            getOptionSelected={(option, value) => option.value === value.value}
            onChange={(event, value) => setLevel(value?.value || "")}
            renderInput={(params) => <TextField {...params} label="Levels" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={goals}
            onChange={(event, value) => setEvent(value.value)}
            renderInput={(params) => <TextField {...params} label="Event" />}
          />
          <TextField
            label="Goal Time"
            variant="outlined"
            value={goalTime}
            onChange={(e) => setGoalTime(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            label="Current Time (if applicable)"
            variant="outlined"
            value={currentTime}
            onChange={handleCurrentTimeChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
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

      {plan &&
        plan.map((week, index) => (
          <Cards key={index} week={week.week} days={week.days} />
        ))} */}
    </>
  );
}

export default Form;
