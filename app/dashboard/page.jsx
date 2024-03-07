"use client";
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      this is the dashboard
    </div>
  );
}

export default Dashboard;
