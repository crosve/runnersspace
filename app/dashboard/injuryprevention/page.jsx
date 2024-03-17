import React from "react";
import Form from "../../components/injuryPage/Form";

const injuries = [
  "overtraining",
  "incorrect technique",
  "incorrect shoes",
  "hard surfaces",
  "and more",
];

function InjuryPrevention() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between w-full"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: "url('/injury.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen min-w-screen flex flex-col lg:flex-row w-full relative bg-gray-500 bg-opacity-50 pl-4 ">
          <div className="lg:w-1/2 flex justify-center items-center ">
            <div className="p-8 mb-20">
              <h1 className="lg:text-left text-5xl lg:text-6xl text-center ">
                Injuries Prevention is key to a successful running career
              </h1>
              <p className="text-s mt-2">
                <br />
                Some common risk factors may include :
                <ul>
                  {injuries.map((injury, index) => (
                    <li key={index}> &bull; {injury}</li>
                  ))}
                </ul>
              </p>
              <p>
                Input some information to your right so we can create a tailored
                training plan for you
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center ">
            <div className="p-8 w-full max-w-[1500px] flex items-center justify-center">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default InjuryPrevention;
