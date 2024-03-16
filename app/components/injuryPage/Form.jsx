"use client";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import Cards from "../injuryPage/Cards";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";

function Form() {
  const [injuryPlan, setInjuryPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const { user } = useAuth();

  const formatInjuryPlan = (injuryPlan) => {
    const split = injuryPlan.split("\n\n");
    const plan = [];

    for (let i = 0; i < split.length; i += 2) {
      const title = split[i];
      const workouts = split[i + 1];

      if (workouts === undefined) break;
      const workoutArray = workouts.split("\n");
      const workoutArrayFormatted = [];
      workoutArray.map((workout, index) => {
        workoutArrayFormatted.push({ workout, index });
      });
      plan.push({ title, workouts: workoutArrayFormatted });
    }
    setInjuryPlan(plan);
  };

  const savePlan = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        injuryPlan: injuryPlan,
      });
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/injuryprevention", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "create me a injury prevention plan " }),
      });
      const data = await res.json();
      formatInjuryPlan(data.text);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!loading ? (
        injuryPlan ? (
          <div className="grid grid-rows-1  md:grid-cols-2 gap-6">
            {injuryPlan.map((current, index) => (
              <Cards
                key={index}
                title={current.title}
                workouts={current.workouts}
              />
            ))}
            <button
              onClick={savePlan}
              className="px-4 block py-2 rounded-lg shadow-md bg-slate-600 text-white hover:bg-slate-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50"
            >
              Save Plan
            </button>
            {saved && (
              <p className="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-md shadow-md text-center">
                Injury plan saved
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={createPlan}
            className="px-4 py-2 rounded-lg shadow-md bg-slate-600 text-white hover:bg-slate-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50"
          >
            Generate Plan
          </button>
        )
      ) : (
        <FallingLines
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={200}
        />
      )}
    </>
  );
}

export default Form;
