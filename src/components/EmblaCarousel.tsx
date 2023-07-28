import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Play, PlusIcon } from "lucide-react";

export const EmblaCarousel = ({ results }: any) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container h-[20rem] md:h-[25rem] lg:h-[30rem]">
        {results?.map((e: any) => (
          <div key={e.id} className="embla__slide relative">
            <img
              className="w-full h-full object-cover  z-0"
              src={e.cover}
              alt={e.title.romaji}
            />
            <div className="z-10 absolute inset-0 bg-gradient-to-tr from-black to-transparent flex items-end">
              <div className="w-full overflow-hidden m-4">
                <h1 className="text-xl text-slate-100 font-bold font-serif xl:text-3xl">
                  {e?.title?.romaji}
                </h1>
                <p
                  className="line-clamp-3 text-zinc-200 my-2 max-w-lg text-xs overflow-hidden xl:text-xl"
                  dangerouslySetInnerHTML={{ __html: e?.description }}
                ></p>
                <div className="py-1 my-2 flex gap-2 justify-start items-center">
                  <Link
                    href={`anime/${e?.id}`}
                    className="text-md flex justify-center items-center text-center text-teal-400 bg-gradient-to-tr from-red-600 to-rose-600 rounded-full p-2 hover:text-slate-50 transition-colors"
                  >
                    <Play />
                  </Link>
                  <Link
                    href={`anime/${e?.id}`}
                    className="p-2 text-md flex justify-center items-center text-slate-50 bg-gradient-to-tr from-teal-600 to-sky-400 rounded-full hover:text-rose-600 transition-colors"
                  >
                    <PlusIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
