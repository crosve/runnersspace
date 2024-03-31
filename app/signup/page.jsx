"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

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
    try {
      await signUp(email, password, userName);
      setSuccess(true);
      clearFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative  text-gray min-h-screen flex items-center justify-center m-6">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <TextField
              key={field.label}
              className="w-full"
              id={field.label}
              label={field.label}
              variant="outlined"
              value={field.value}
              type={field.type}
              onChange={(e) => field.targetValue(e.target.value)}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Signup
          </button>
        </form>
        <h1 className="pt-4 text-left">
          Already have an account? Sign in{" "}
          <a className="text-sky-700	" href="/login">
            here
          </a>
        </h1>
        {success && (
          <p className="text-green-500 font-semibold border-solid">
            Signup successful
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
