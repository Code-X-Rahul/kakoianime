"use client";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import Slider from "./Slider";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcdn/dialog"
import Watch from "./Watch";
import { AllTabs } from "./Tabs";

const AnimeInfo = ({ animeId, episodes, characters, relations, title, recommendations }: any) => {
  const [open, setOpen] = useState(false);

  const style = !open && "line-clamp-6 overflow-hidden";
  // const reversedEp = [episodes].reverse();
  // console.log(reversedEp);


  return (
    <div className="p-4 text-slate-300">
      <h1 className="text-2xl py-1 text-teal-400 xl:text-4xl">Episodes</h1>
      <div
        className={`grid grid-cols-6 gap-3 p-2 py-4 hide-scrollbar ${episodes?.length > 50 && "h-72 overflow-hidden overflow-y-scroll"
          } md:grid-cols-8 lg:grid-cols-12 `}
      >
        {episodes?.reverse().map((episode: any) => (
          <Dialog key={episode.id}>
            <DialogTrigger className="bg-zinc-950 rounded-lg flex justify-center items-center hover:bg-zinc-900 transition-all ease-in-out visited:bg-zinc-700">
              <span className="py-3 px-4">{episode?.number}</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{episode?.id?.replaceAll("-", " ")}</DialogTitle>
              </DialogHeader>
              <Watch animeId={animeId} episodeId={episode?.id} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <AllTabs characters={characters} type={relations} title={title?.romaji} />
      {recommendations?.length !== 0 && (
        <Slider type={recommendations} heading="Recommendation" />
      )}
    </div>
  );
};

export default AnimeInfo;
