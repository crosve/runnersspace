"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";

var in30Minutes = 1 / 48;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("Please fill in all fields");
    }
    setEmail(email.trim());
    console.log("here");

    try {
      await login(email, password);
      Cookies.set("verify", "value");
      console.log("logged in");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative  text-gray min-h-screen flex items-center justify-center m-6">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </form>
        <h1 className="pt-4 text-left">
          Don&apos;t have an account? Create one{" "}
          <a className="text-sky-700	" href="/signup">
            here
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Login;
