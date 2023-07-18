import Link from "next/link";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "../shadcdn/tooltip"
import Image from "next/image";

const Card = ({ image, title, id, height, width, type, duration }: any) => {
  return (
    <>
      <Link
        href={`../anime/${id}`}
        className={` relative w-[${width}] h-${height} overflow-hidden rounded-sm hover:scale-105 transition-all ease-in`}
      >
        <div className={`bg-zinc-900 aspect-[1/1.3] relative`}>
          <Image
            width={"100"}
            height={"100"}
            src={image}
            className="flex w-[100%] h-[100%] object-cover hover:opacity-60"
            alt={title?.romaji}
          />
          {duration && <p className="text-center font-thin text-xs text-white p-[2px] absolute bottom-0 right-0 bg-red-600 rounded-tl-lg">
            {duration}min
          </p>}
        </div>
        <h1 className="text-center line-clamp-2 px-3 text-zinc-100">{title?.romaji}</h1>
        <h3 className="text-center font-semibold text-xs text-white px-1 absolute top-0 right-0 bg-red-600 rounded-bl-lg">
          {type}
        </h3>
      </Link>
    </>
  );
};

export default Card;
