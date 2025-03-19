import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    <div className="w-full mx-auto h-screen md:h-auto rounded-md p-10 sm:p-20 md:p-40 lg:p-72 overflow-hidden">
      <Vortex
        backgroundColor="white"
        className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full text-7xl sm:text-5xl md:text-7xl lg:text-9xl henny-penny-regular text-white"
      >
        <span className="animate-bounce delay-[0ms] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          V
        </span>
        <span className="animate-bounce delay-[200ms] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          C
        </span>
        <span className="animate-bounce delay-[400ms] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          O
        </span>
        <span className="animate-bounce delay-[600ms] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          D
        </span>
        <span className="animate-bounce delay-[800ms] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          E
        </span>
      </Vortex>
      <div className="flex justify-center">
        <p className="text-lg md:text-3xl font-medium text-fuchsia-600  text-center px-6 md:px-24 lg:px-20  tracking-wide vt323-regular">
          Participate and add value and certificate in your work and life.
        </p>
      </div>
    </div>
  );
}
