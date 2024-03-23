"use client";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [saved, setSaved] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/data.json");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleNewPage = (url) => {
    window.open(url, "_blank");
  };

  const saveItem = async (item) => {
    console.log(item);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        shoes: arrayUnion(item),
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!loading && data) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg "
          >
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
            <button
              onClick={() => saveItem(item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>{" "}
            {saved && <p>Item saved</p>}
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
