// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
"use client";
import { useState } from "react";

import UsersTabs from "../components/dashboardPage/UsersTabs";
import Cards from "../components/trainingPage/Cards";

function Dashboard() {
  const [info, setInfo] = useState(null);
  return (
    <main className="flex flex-col items-center h-screen w-screen overflow-auto">
      <UsersTabs info={info} setInfo={setInfo} />
      {info && (
        <div className=" relative mt-8 p-20">
          <div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            className="grid grid-cols-4 gap-6"
          >
            <h1 className="col-span-full text-center text-2xl font-extrabold	">
              Training Plan
            </h1>
            {info.map((week, index) => (
              <Cards key={index} week={week.week} days={week.days} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
