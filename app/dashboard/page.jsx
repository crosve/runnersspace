// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
"use client";
import { useState } from "react";

import UsersTabs from "../components/dashboardPage/UsersTabs";
import Cards from "../components/trainingPage/Cards";
import InjuryPlan from "../components/dashboardPage/InjuryPlan";

function Dashboard() {
  const [info, setInfo] = useState(null);
  const [injuryInfo, setInjuryInfo] = useState(null);

  const [reveal, setReveal] = useState(false);
  const [feedBack, setFeedBack] = useState("");

  const handleRewrite = async () => {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: feedBack, info: info }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <main className="flex flex-col items-center h-screen w-screen overflow-auto">
      <UsersTabs info={info} setInfo={setInfo} setInjuryInfo={setInjuryInfo} />
      {info && (
        <div className=" relative mt-8 p-20">
          <div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            className="grid grid-rows-1 lg:grid-cols-4 gap-6"
          >
            <h1 className="col-span-full text-center text-2xl font-extrabold	">
              Training Plan
            </h1>
            {info.map((week, index) => (
              <Cards key={index} week={week.week} days={week.days} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setReveal(true)}
              className="h-fit w-fit p-4 bg:slate-100 hover:bg-slate-200 rounded-lg"
            >
              Rewrite Plan
            </button>
          </div>
          {reveal && (
            <div className="w-full h-[200px] border-4">
              <input
                className="w-full h-full"
                type="text"
                onChange={(e) => setFeedBack(e.target.value)}
                placeholder="put your feedback here"
              ></input>
              <div className="flex w-full justify-center">
                <button
                  onClick={() => handleRewrite()}
                  className="h-fit w-fit p-4 bg:slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {injuryInfo && <InjuryPlan injuryInfo={injuryInfo} />}
    </main>
  );
}

export default Dashboard;
