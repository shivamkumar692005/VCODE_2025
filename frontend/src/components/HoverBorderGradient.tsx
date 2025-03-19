import { HoverBorderGradient } from "./ui/hover-border-gradient";
 

export function HoverBorder() {
    return (
      <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
    >
      <span>Know more</span>
    </HoverBorderGradient>
    );
  }
  