'use client'
import { useAnime } from "../../../context/AnimeContext";
import AnimeInfo from "../../../components/AnimeInfo";
import { DiscussionEmbed } from "disqus-react";
import LoadingPage from "../../../components/LoadingPage";


const Anime = ({params}:any) => {
    const { animeId } = params
    
    const { queryFn } = useAnime();
    const info = queryFn(animeId);

    if (info.isLoading) return (<LoadingPage/>)
    if (info.isError) return (<h1>Error loading data!!!</h1>)


    const disqusConfig = {
        url: `https://mangekyoreader.netlify.app/anime/${info.data?.id}`,
        identifier: info.data?.id, // Single post id
        title: info.data?.title?.romaji // Single post title
      }
      
    return (
        <section className=" lg:px-4">
            <div className="flex p-4 relative">
                <img className="w-[10rem] z-10" src={info.data?.image} alt={info.data?.title?.romaji} />
                <div className="ml-4 z-10 text-slate-100">
                    <h1 className="text-2xl py-1">{info.data?.title?.romaji} ({info.data?.releaseDate})</h1>
                    <p className="text-sm py-1 text-teal-400">{info.data?.status}</p>
                    <h3 className="text-sm text-zinc-300">{info.data?.genres.join(", ")}</h3>
                    <h3 className="text-sm">{info.data?.studios.join(', ')}</h3>
                    <h3 className="text-sm">{info.data?.type}</h3>
                    <h4 className="text-xl absolute right-3 top-1 text-teal-400"><span className="text-yellow-500 text-3xl mt-1">✩</span>{info.data?.rating}+</h4>
                </div>
                <div className="absolute inset-0 bg-black z-0">
                    <img className=" pointer-events-none opacity-40 blur-sm w-full h-[100%] object-cover " src={info.data?.cover} alt={info.data?.id} />
                </div>
            </div>
            <AnimeInfo info={info} animeId={animeId} />
            <div className="py-10 px-3">
                <DiscussionEmbed shortname="mangekyoreader" config={disqusConfig} />
            </div>
        </section>

    )
}

export default Anime