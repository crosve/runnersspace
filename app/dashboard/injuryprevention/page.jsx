import React from "react";

function InjuryPrevention() {
  return (
    <div
      className="h-screen w-screen bg-gray-100 bg-fit"
      style={{
        backgroundImage: "url('/injury.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)",

        "@media (minWidth: 1000px)": {
          backgroundPosition: "center",
        },
      }}
    >
      <div>hey</div>
    </div>
  );
}

export default InjuryPrevention;
