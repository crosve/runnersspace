import Carousel from "./components/LandingPage/home/Carousel";
export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between w-full"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/running.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full min-w-screen flex lg:items-center lg:justify-center flex-col lg:flex-row w-full relative bg-gray-500 bg-opacity-50">
          <div className="lg:w-1/2 lg:mt-32 flex justify-center h-full items-center">
            <div className="p-8 mb-10 lg:mb-0 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl xl:text-8xl">
                Welcome to <br />{" "}
                <i className="lg:pl-16 lg:text-8xl font-bold">Pace Pulse</i>
              </h1>
              <p className="text-sm lg:text-xs mt-2">
                Free resources for runners of all backgrounds
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 lg:hidden hidden">
            <div className="p-8 w-full max-w-[1500px] flex items-center justify-center">
              <Carousel />
            </div>
          </div>
          <div className="lg:w-1/2 hidden lg:flex items-center justify-center">
            <div className="p-8 w-full max-w-[1500px] flex items-center justify-center">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
