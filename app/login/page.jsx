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

  const handleLogin = async () => {
    if (email === "" || password === "") {
      return alert("Please fill in all fields");
    }
    setEmail(email.trim());

    try {
      await login(email, password);
      Cookies.set("verify", "value", { expires: in30Minutes });
      console.log("logged in");
      router.push("/dashboard");
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
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          text: "black",
        }}
      >
        <h1 className="text-bold text-2xl text-black">Login</h1>
        <TextField
          className="w-full"
          id="outlined-basic"
          label="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className=" h-8 text-black border-2 w-full hover:focus:bg-blue-200"
        >
          Login
        </button>
      </Box>
    </div>
  );
}

export default Login;
