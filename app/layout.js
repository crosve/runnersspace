"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/LandingPage/Navbar";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
        {children}
        </AuthProvider>
        
      </body>

    </html>
  );
}
