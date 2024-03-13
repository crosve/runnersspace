
import Carousel from "./components/LandingPage/home/Carousel";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 w-full backdrop-blur-lg" style={{ backgroundSize: "cover", backgroundPosition: "center",  backdropFilter: "blur(40px)" }}>
    <div className="min-h-screen min-w-screen flex flex-col lg:flex-row w-full">
      <div className="lg:w-1/2 flex justify-center items-center ">
        <div className="p-8 mb-52">
          <h1 className="lg:text-left text-5xl lg:text-8xl text-center ">
            Welcome to <br/> <i className="pl-16 lg:text-7xl font-bold">Pace Pulse</i>
          </h1>
          <p className="text-xs mt-2">Free resources for runners of all backgrounds</p>
        </div>
      </div>
      <div className="lg:w-1/2 flex items-center justify-center ">
        <div className="p-8 w-full max-w-[1500px] flex items-center justify-center">
          <Carousel />
        </div>
      </div>
    </div>
  </main>
  
  );
}
