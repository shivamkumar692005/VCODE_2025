import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            24 hour Hackerthon
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742486183/WhatsApp_Image_2025-03-20_at_20.33.05_f8dc14e6_rxtfjn.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            Technical Quiz
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742486313/VCODE_QUIZZ_jbpmva.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",

      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-4">
            Code Arena
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742486402/h_mwtcvi.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            CodeHunt
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742486482/Codehunt_civ6yt.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-right h-50 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            Poster Presentation
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742489959/WhatsApp_Image_2025-03-20_at_22.28.43_1a1dabea_wngawg.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-50 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full ">
      <Timeline data={data} />
    </div>
  );
}
