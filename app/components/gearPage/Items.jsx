"use client";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [saved, setSaved] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  const { user } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const response = await fetch("/data.json");
  //     const data = await response.json();
  //     setData(data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("/api/scrape");
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getItems();
  }, []);

  const saveItem = async (item) => {
    console.log(item);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        shoes: arrayUnion(item),
      });
      setSaved(true);
      setSavedItems([...savedItems, item]);
    } catch (error) {
      console.log(error);
    }
  };
  if (!loading && data) {
    return (
      <div
        style={{ margin: "0 auto", paddingTop: "60px" }}
        className="grid grid-rows-1 lg:grid-cols-3 gap-6"
      >
        {data.map((item, index) => (
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
            <div className="w-full flex">
              <button
                onClick={() => saveItem(item)}
                className="p-4 rounded-md outline-2 text-sm large:text-sm hover:bg-slate-300 hover:transition-opacity duration-300 ease-in-out flex-grow bg-gray-200 text-gray-800 hover:text-gray-900"
              >
                Save
              </button>{" "}
              {savedItems.includes(item) && (
                <p className="p-4 w-1/2 text-sm large:text-sm  text-center text-lime-500	">
                  Item saved
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        loading..
      </div>
    );
  }
}

export default Items;
