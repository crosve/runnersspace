import Input from "../../components/LandingPage/healthcomponents/Input";
import Button from "../../components/LandingPage/healthcomponents/Button";
import Cards from "../../components/LandingPage/healthcomponents/Cards";

const cardInfo = [
  {
    title: "Fruit and vegetables",
    description: "good for vitamins, minerals and antioxidants",
    url: "/fruits.jpeg",
    alt: "fruits",
  },
  {
    title: "Lean protein",
    description: "good for muscle repair and growth",
    url: "/protein.webp",
    alt: "protein",
  },
  {
    title: "Healthy fats",
    description: "good for energy and brain function",
    url: "/healthyfats.jpeg",
    alt: "fats",
  },
  {
    title: "Healthy carbohydrates",
    description: "good for energy and a necessary for distance runners",
    url: "/carbs.jpeg",
    alt: "carbs",
  },
];

function Health() {
  return (
    <div>
      <div className="h-screen w-screen flex  items-start flex-col gap-4 bg-[url('/nutrition.jpeg')] bg-cover bg-center text-4xl">
        <div
          style={{
            marginTop: "15rem",
            marginLeft: "5rem",

            "@media (minWidth: 1000px)": {
              marginLeft: "10rem",
              marginTop: "20rem",
            },
          }}
        >
          <h1 className="text-6xl font-bold">Nutrition</h1>
          <p className="text-xl mt-4 text-center">
            When the right diet aligns with the runner anythings possible{" "}
          </p>
          <Button />
        </div>
        {/* <div className="h-80 w-80 border-4"> */}
        {/* <Input /> */}
        {/* </div> */}
      </div>
      <div className="h-fit lg:h-screen w-screen ">
        <div className="flex w-full h-full items-center justify-center flex-col p-4">
          <h1 className="text-6xl font-bold text-center">Basic outline</h1>
          <div className="flex flex-col lg:flex-row">
            {cardInfo.map((card, index) => {
              return (
                <Cards
                  key={index}
                  title={card.title}
                  description={card.description}
                  url={card.url}
                  alt={card.alt}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex justify-center items-center bg-gray-200">
          <div className="p-8 ">
            <h1 className="lg:text-left text-xl text-center">
              Need to ask something specific? <br /> Ask our AI for help
            </h1>
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center  ">
          <div className="p-8 w-full">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Health;
