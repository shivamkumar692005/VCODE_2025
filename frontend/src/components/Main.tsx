import { TimelineDemo } from "./TimelineDemo";
import { VortexDemo } from "./VortexDemo";


const Main = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Blurred Background */}
      <div
        className="top-0 absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: "url('https://wallpaperaccess.com/full/127067.jpg')",
        }}
      ></div>
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          
          <VortexDemo />

          
        </h1>
      </div>
    </div>
  );
};

export default Main;
