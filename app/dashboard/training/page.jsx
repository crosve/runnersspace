import React from "react";
import Form from "@/app/components/trainingPage/Form";

function Training() {
  return (
    <div className=" bg-gray-100 ">
      <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex justify-center items-center bg-gray-200">
          <div className="p-8 ">
            <h1 className="lg:text-left text-xl text-center">
              Lets get you a persnalized training plan. <br /> Input some
              details about what you're looking for
            </h1>
          </div>
        </div>
        <div className="lg:w-1/2  flex items-center justify-center  ">
          <div className="p-8 w-full text-center">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
