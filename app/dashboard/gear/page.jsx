import React from "react";
import Form from "../../components/gearPage/form";
import Items from "../../components/gearPage/Items";

function Gear() {
  return (
    <div className="flex flex-col justify-center bg-gray-100 text-4xl font-bold pt-24 overflow-auto">
      <div>
        <Form />
      </div>

      <div className="relative w-full p-6">
        <Items />
      </div>
    </div>
  );
}

export default Gear;
