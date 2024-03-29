import React from "react";
import { useAuth } from "@/app/context/AuthContext";

function ShoesItems({ shoes, setShoes }) {
  const handleNewPage = (url) => {
    window.open(url, "_blank");
  };

  const { deleteItem } = useAuth();

  const deleteItem1 = (item) => {
    deleteItem(item);
    const newShoes = shoes.filter((shoe) => shoe.shoeName !== item.shoeName);
    setShoes(newShoes);
  };

  return (
    <div
      style={{ margin: "0 auto", paddingTop: "60px" }}
      className="grid grid-rows-1 lg:grid-cols-3 gap-6"
    >
      <h1 className="col-span-full text-center text-2xl font-extrabold	">
        Saved Shoes
      </h1>
      {shoes.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg "
        >
          <a
            className="block"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="w-auto h-auto rounded-t-lg"
              src={item.showImage}
              alt={item.shoeName}
              style={{ display: "block" }}
            />
          </a>
          <div className="p-4">
            <p className="text-xl font-semibold">{item.shoeName}</p>
            <p className="text-gray-600">{item.shoePrice}</p>
          </div>
          <button
            className="p-4 rounded-md outline-2 text-sm large:text-sm  hover:bg-slate-200 hover:transition-opacity duration-300 ease-in-out w-1/2 bg-gray-200 text-gray-800 hover:text-gray-900"
            onClick={() => deleteItem1(item)}
          >
            Delete Item
          </button>

          <button
            onClick={() => handleNewPage(item.shoeUrl)}
            className="p-4  rounded-md outline-2 text-sm   hover:transition-opacity duration-300 ease-in-out w-1/2 bg-green-500 text-white hover:bg-green-600"
          >
            Buy Item
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShoesItems;
