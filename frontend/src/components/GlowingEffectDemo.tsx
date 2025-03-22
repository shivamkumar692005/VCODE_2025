import { BookOpen, Code, Cpu, PenTool, Search } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import HeaderButton from "./HeaderButton";
import { HoverBorder } from "./HoverBorderGradient";
import { useState } from "react";
import InfoModal from "./InfoModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventDetails: Record<string, any> = {
  "Poster Presentation": {
    "Team Size": "Mandatory",
    "Levels": "To be announced shortly",
    "Venue": "To be announced shortly",
    "Theme": "To be announced shortly",
    "Submission Format": "Hard Copy",
    "Payment": "Mandatory",
  },
  "CodeHunt": {
    "Team Size": 3,
    "Levels": 5,
    "Venue": "To be announced shortly",
    "Payment": "Mandatory",
  },
  "Hackathon": {
    "Team Size": "3rd Years - 3, 2nd Years - 2 (Mandatory)",
    "Levels": "To be announced shortly",
    "Venue": "To be announced shortly",
    "Duration": "24hrs Day and Night",
    "Domain": "Web",
    "Theme": "To be announced shortly",
    "Payment": "Mandatory",
  },
  "Coding": {
    "Team Size": 1,
    "Levels": 3,
    "Venue": "To be announced shortly",
    "Allowed Languages": "C, C++, Java, Python",
    "Payment": "Mandatory",
  },
  "Technical Quiz": {
    "Team Size": 4,
    "Levels": 1,
    "Venue": "To be announced shortly",
    "Topics": "OS, DBMS, Data Structures, Code Snippets",
    "Payment": "Mandatory",
  },
};

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-2 xl:gap-2 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<PenTool className="h-6 w-6 text-purple-500" />}
        title="Poster Presentation"
        description="Innovative Ideas. Creative Design. Impactful Solutions."
        img="https://slidemodel.com/wp-content/uploads/01-poster-presentation-cover.png"
        url="/register/poster"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Search className="h-6 w-6 text-purple-500" />}
        title="CodeHunt"
        description="CodeHunt: Solve, Discover, Code, Conquer!"
        img="https://th.bing.com/th/id/OIP.wP41cuVK5UmULDvdTJVhqAHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        url="/register/codehunt"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Cpu className="h-6 w-6 text-purple-500" />}
        title="Hackathon"
        description="Innovate, collaborate, create groundbreaking solutions!"
        img="https://th.bing.com/th/id/OIP.7oP9gzuSW1NDcCeoNBJadAHaE4?w=268&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        url="/register/hackathon"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Code className="h-6 w-6 text-purple-500" />}
        title="Coding"
        description="Crafting logic, solving problems, creating possibilities!"
        img="https://static.vecteezy.com/system/resources/previews/019/153/003/original/3d-minimal-programming-icon-coding-screen-web-development-concept-laptop-with-a-coding-screen-and-a-coding-icon-3d-illustration-png.png"
        url="/register/coding"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<BookOpen className="h-6 w-6 text-purple-500" />}
        title="Technical Quiz"
        description="Test knowledge, challenge intellect, excel!"
        img="https://th.bing.com/th/id/OIP.mMlI9apfooTEKLVFUAV79wHaE8?w=247&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        url="/register/quiz"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  img?: string;
  url: string;
}

const GridItem = ({ area, icon, title, description, img, url }: GridItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li className={`min-h-[18rem] md:min-h-[16rem] lg:min-h-[14rem] list-none ${area} mx-5`}>
        <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
          <GlowingEffect spread={100} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-3">
            <div className="relative flex flex-1 flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-fit rounded-lg border border-gray-600 p-2">{icon}</div>
                <div className="w-fit rounded-lg border border-gray-600 p-2">
                  <img src={img} alt="Event Logo" className="h-10 w-auto" />
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="pt-0.5 text-xl font-semibold font-sans text-gray-400 dark:text-gray-400">{title}</h3>
                <h2 className="font-sans text-sm md:text-base text-gray-400 dark:text-neutral-400">{description}</h2>
              </div>
              <div className="flex justify-between mt-4">
                <HeaderButton url={url} />
                <HoverBorder onClick={() => setIsModalOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Dynamic Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={
          <>
            <p>{description}</p>
            <ul className="mt-2 text-sm text-gray-400">
              {Object.entries(eventDetails[title] || {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </>
        }
        img={img}
      />
    </>
  );
};
