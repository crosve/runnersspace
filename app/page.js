
import Carousel from "./components/LandingPage/home/Carousel";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full" style={{ backdropFilter: "blur(5px)" }}>
  <div className="h-screen w-screen" style={{ backgroundImage: "url('/running.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className="min-h-screen min-w-screen flex flex-col lg:flex-row w-full relative bg-gray-500 bg-opacity-50">
      <div className="lg:w-1/2 flex justify-center items-center ">
        <div className="p-8 mb-52">
          <h1 className="lg:text-left text-5xl lg:text-8xl text-center ">
            Welcome to <br/> <i className="pl-16 lg:text-8xl font-bold">Pace Pulse</i>
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
  </div>
</main>
  
  
  );
}
