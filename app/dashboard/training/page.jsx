"use client";
import Form from "@/app/components/trainingPage/Form";
import { useState } from "react";
import Cards from "@/app/components/trainingPage/Cards";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

function Training() {
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [saved, setSaved] = useState(false);

  const { user } = useAuth();

  const saveTrainingPlan = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        trainingPlan: trainingPlan,
      });
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {trainingPlan ? (
        <div className="bg-gray-100 relative  p-20">
          <div
            style={{ maxWidth: "800px", margin: "0 auto" }}
            className="grid grid-cols-4 gap-6"
          >
            <h1 className="col-span-full text-center text-2xl font-extrabold	">
              Training Plan
            </h1>
            {trainingPlan.map((week, index) => (
              <Cards key={index} week={week.week} days={week.days} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={saveTrainingPlan}
              className="bg-slate-300 text-white px-4 py-2 rounded-md hover:text-blue-300"
            >
              Save training plan
            </button>
            {saved && <p className="text-green-500">Training plan saved</p>}
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 relative mt-10 md:mt-0 ">
          <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex justify-center items-center bg-gray-200">
              <div className="p-8">
                <h1 className="lg:text-left text-xl text-center">
                  Let&apos;s get you a personalized training plan. <br /> Input
                  some details about what you&apos;re looking for
                </h1>
              </div>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="p-8 w-full text-center">
                <Form
                  trainingPlan={trainingPlan}
                  setTrainingPlan={setTrainingPlan}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Training;
