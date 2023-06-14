import CharacterCard from "./CharacterCard";
import Slider from "./Slider";
import Link from "next/link";

const AnimeInfo = ({ info, animeId }:any) => {

    const reversedEp = info?.data && [...info?.data?.episodes].reverse();

    return (
        <div className=" text-slate-300">
            <div className="p-4">
                <h1 className="text-2xl py-1  text-teal-500">Description</h1>
                <p className="text-sm py-1" dangerouslySetInnerHTML={{ __html: info.data?.description }}></p>
            </div>
            <div className="p-4">
                <h1 className="text-2xl py-1  text-teal-400">Episodes</h1>
                <div className="grid grid-cols-6 gap-3 p-2 py-4 hide-scrollbar">
                    {info.data && reversedEp.map((episode:any) =>
                        <Link href={`../anime/${animeId}/watch/${episode?.id}`} className="bg-zinc-950 rounded-lg flex justify-center items-center hover:bg-zinc-900 transition-all ease-in-out" key={episode.id}>
                            <span className="py-3 px-4">{episode?.number}</span>
                        </Link>
                    )}
                </div>
            </div>
            {info?.data?.relations.length !== 0 && <Slider type={info?.data?.relations} heading='Recommendation' />}

            {info?.data?.characters.length !== 0 && <CharacterCard characters={info.data?.characters} title={info?.data?.title?.romaji} />}
            {info?.data?.recommendations.length !== 0 && <Slider type={info?.data?.recommendations} heading='Recommendation' />}
        </div>
    )
}

export default AnimeInfo