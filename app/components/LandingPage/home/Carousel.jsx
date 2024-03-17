import React from "react";

const cardInfo = [
  {
    title: "Personal Training",
    description: "Training tailored to your race goals",
  },
  {
    title: "Nutrition",
    description: "Nutrition advice and 24/7 nutrition support",
  },
  {
    title: "Injury and Recovery",
    description:
      "Injury prevention plan made for you and recovery advice after those hard workouts",
  },
  {
    title: "Gear",
    description: "Race day gear advice and price tracking",
  },
];

function Carousel() {
  return (
    <div className="flex gap-6 flex-wrap justify-center mb-16">
      {cardInfo.map((card, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">
              {card.title}
            </div>
            <p className="text-gray-100		 text-base">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carousel;
