import Link from "next/link";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "../shadcdn/tooltip"
import Image from "next/image";

const Card = ({ image, title, id, status, height, width }: any) => {
  return (
    <>
      <Link
        href={`../anime/${id}`}
        className={` relative w-[${width}] h-${height} overflow-hidden bg-sky-300 rounded-sm hover:scale-105 transition-all ease-in grid`}
      >
        <div className="bg-zinc-900">
          <Image
            width={"100"}
            height={"100"}
            src={image}
            className="w-[100%] h-full object-cover hover:opacity-60"
            alt={title?.romaji}
          />
        </div>
        <div className="line-clamp-2 overflow-hidden h-12 ">
          <h1 className="text-center px-3 text-zinc-900">{title?.romaji}</h1>
        </div>
        {status === "Ongoing" && (
          <h3 className="text-center text-sm px-1 absolute top-0 right-0 bg-teal-400 rounded-bl-lg">
            {status}
          </h3>
        )}
        {status === "Completed" && (
          <h3 className="text-center text-teal-400 text-sm px-1 absolute top-0 right-0 bg-zinc-900 rounded-bl-lg">
            {status}
          </h3>
        )}
      </Link>
    </>
  );
};

export default Card;
