'use client'
import AnimeInfo from "../../../components/AnimeInfo";
import { DiscussionEmbed } from "disqus-react";
import LoadingPage from "../../../components/LoadingPage";
import { FaStar } from "react-icons/fa";
import { META } from "@consumet/extensions";
import { useQuery } from "react-query";


const AnimePage = ({ params }: any) => {
    const { animeId } = params

    const fetchAnimeInfo = async (id: any) => {
        try {
            // const url = `https://api.consumet.org/meta/anilist/info/${id}`;
            // const { data } = await axios.get(url, { params: { page: pageNo } });
            const getAnime = new META.Anilist();
            const results = await getAnime.fetchAnimeInfo(id);
            return results
        } catch (err) {
            console.log(err)
        }
    };

    const info = useQuery({
        queryKey: ['info', animeId],
        queryFn: () => fetchAnimeInfo(animeId)
    })

    if (info.isLoading) return (<LoadingPage />)
    if (info.isError) return (<h1>Error loading data!!!</h1>)
    if (info.isSuccess) {
        const disqusConfig = {
            url: `https://kakoianime.vercel.app/anime/${info.data?.id}`,
            identifier: info.data?.id, // Single post id
            title: info.data?.title?.romaji || info.data?.title?.english // Single post title
        }
        return (
            <section className="">
                <div className="flex flex-col items-center md:flex-row md:items-start p-4 relative">
                    <img className="w-[10rem] object-contain z-10 xl:w-[15rem]" src={info.data?.image} alt={info.data?.title?.romaji} />
                    <div className="ml-4 z-10 text-slate-100">
                        <h1 className="text-2xl py-1 mt-1 text-center md:text-3xl lg:text-4xl">{info.data?.title?.romaji} ({info.data?.releaseDate})</h1>
                        <p className="text-sm py-1 text-teal-400 md:text-md lg:text-lg xl:text-xl my-1">{info.data?.status}</p>
                        <h3 className="text-sm text-zinc-300 md:text-md lg:text-lg xl:text-xl my-1">{info.data?.genres.join(", ")}</h3>
                        <h3 className="text-sm md:text-md lg:text-lg xl:text-xl my-1">{info.data?.studios.join(', ')}</h3>
                        <h3 className="text-sm md:text-md lg:text-lg xl:text-xl my-1">{info.data?.type}</h3>
                        <h4 className="text-xl absolute right-3 top-0 flex justify-center items-center text-teal-400 lg:text-3xl">
                            <FaStar className="text-yellow-500 text-3xl mt-1 mr-1 xl:text-4xl" />{info.data?.rating}+</h4>
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
}

export default Anime