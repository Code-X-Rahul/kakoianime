import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export const EmblaCarousel = ({ image, results }: any) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container h-[20rem]">
        {results?.map((e: any) => (
          <div key={e.id} className="embla__slide relative">
            <img
              className="w-full h-full object-cover object-top z-0"
              src={e.image}
              alt={e.title.romaji}
            />
            <div className="z-10 absolute inset-0 bg_linear flex items-end">
              <div className="w-full overflow-hidden m-4">
                <h1 className="text-xl text-slate-100 font-bold font-serif ">{e?.title?.romaji}</h1>
                <p
                  className="line-clamp-2 text-zinc-200 my-2  text-xs overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: e?.description }}
                ></p>
                <div className="py-1 my-2">
                  <Link href = {`anime/${e?.id}`}className="text-md text-zinc-900 bg-teal-400 rounded-3xl p-2 mr-2">
                    Watch Now <span className="text-yellow-500">▶</span>
                  </Link>
                  <Link href = {`anime/${e?.id}`} className="text-md text-zinc-900 bg-teal-400 rounded-3xl p-2 m-2">
                    Add to Watchlist <span className="text-yellow-500">+</span>
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
