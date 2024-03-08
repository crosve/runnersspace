"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fields = [
    {
      label: "username",
      targetValue: setUserName,
      value: userName,
    },
    {
      label: "email",
      targetValue: setEmail,
      value: email,
    },
    {
      label: "password",
      targetValue: setPassword,
      value: password,
      type: "password",
    },
    {
      label: "confirm password",
      targetValue: setConfirmPassword,
      value: confirmPassword,
      type: "password",
    },
  ];

  const clearFields = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    setEmail(email.trim());
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return alert("Please fill in all fields");
    }
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      return alert("Passwords do not match");
    }
    console.log(email, password);
    try {
      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username: userName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      clearFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative text-white h-screen flex items-center justify-center">
      <Box
        sx={{
          padding: "2",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
        }}
      >
        <h1 className="text-bold text-2xl text-black"> Signup </h1>

        {fields.map((field) => {
          return (
            <TextField
              key={field.label}
              className="w-full"
              id="outlined-basic"
              label={field.label}
              variant="outlined"
              value={field.value}
              type={field.type}
              onChange={(e) => field.targetValue(e.target.value)}
            />
          );
        })}

        <button
          onClick={handleSubmit}
          className="text-black border-2 w-full py-2 px-4 rounded"
        >
          Signup
        </button>
      </Box>
    </div>
  );
}

export default Signup;
