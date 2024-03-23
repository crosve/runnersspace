import React from "react";

function ShoesItems({ shoes }) {
  const handleNewPage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div
      style={{ wdith: "800px", margin: "0 auto" }}
      className="grid grid-rows-1 lg:grid-cols-3 gap-6"
    >
      <h1 className="col-span-full text-center text-2xl font-extrabold	">
        Saved Shoes
      </h1>
      {shoes.map((item, index) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg ">
          <a onClick={() => handleNewPage(item.shoeUrl)} className="block">
            <img
              className="w-48 h-auto rounded-t-lg "
              src={item.showImage}
              alt={item.shoeName}
            />
          </a>
          <div className="p-4">
            <p className="text-xl font-semibold">{item.shoeName}</p>
            <p className="text-gray-600">{item.shoePrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoesItems;
