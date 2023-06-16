import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export const EmblaCarousel = ({ image, results }: any) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container h-[18rem]">
        {results?.map((e: any) => (
          <div key={e.id} className="embla__slide relative">
            <img
              className="w-full h-full object-cover z-0"
              src={e.cover}
              alt=""
            />
            <div className="z-10 absolute inset-0 bg_linear flex items-end">
              <div className="w-full overflow-hidden m-4">
                <h1 className="text-xl text-slate-300 ">{e?.title?.romaji}</h1>
                <p
                  className="line-clamp-3 text-zinc-400  text-sm overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: e?.description }}
                ></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
