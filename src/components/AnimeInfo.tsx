"use client";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import Slider from "./Slider";
import Link from "next/link";

const AnimeInfo = ({ info, animeId }: any) => {
  const [open, setOpen] = useState(false);

  const style = !open && "line-clamp-6 overflow-hidden";
  const reversedEp = info?.data && [...info?.data?.episodes].reverse();

  return (
    <div className=" text-slate-300">
      <div className="p-4">
        <h1 className="text-2xl py-1 text-teal-500">Description</h1>
        <p
          onClick={() => setOpen((prev) => !prev)}
          className={`text-sm py-1 ${style}`}
          dangerouslySetInnerHTML={{ __html: info.data?.description }}
        ></p>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-none text-sm py-1 text-teal-700"
        >
          Show {open ? "Less" : "More"}
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-2xl py-1  text-teal-400">Episodes</h1>
        <div
          className={`grid grid-cols-6 gap-3 p-2 py-4 hide-scrollbar ${
            reversedEp?.length > 50 && "h-72 overflow-hidden overflow-y-scroll"
          } md:grid-cols-8 lg:grid-cols-12 `}
        >
          {info.data &&
            reversedEp.map((episode: any) => (
              <Link
                href={`${animeId}/watch/${episode?.id}`}
                className="bg-zinc-950 rounded-lg flex justify-center items-center hover:bg-zinc-900 transition-all ease-in-out visited:bg-zinc-700"
                key={episode.id}
              >
                <span className="py-3 px-4">{episode?.number}</span>
              </Link>
            ))}
        </div>
      </div>
      {info?.data?.relations.length !== 0 && (
        <Slider type={info?.data?.relations} heading="Related" />
      )}

      {info?.data?.characters.length !== 0 && (
        <CharacterCard
          characters={info.data?.characters}
          title={info?.data?.title?.romaji}
        />
      )}
      {info?.data?.recommendations.length !== 0 && (
        <Slider type={info?.data?.recommendations} heading="Recommendation" />
      )}
    </div>
  );
};

export default AnimeInfo;
