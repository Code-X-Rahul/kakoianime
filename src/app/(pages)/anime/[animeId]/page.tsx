'use client'
import AnimeInfo from "@/components/AnimeInfo";
import { DiscussionEmbed } from "disqus-react";
import LoadingPage from "@/components/LoadingPage";
import { META } from "@consumet/extensions";
import { useQuery } from "react-query";
import DetailsBanner from "@/components/Details-Banner";
import Link from "next/link";


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

    const { data, isLoading, isError, isSuccess }: any = useQuery({
        queryKey: ['info', animeId],
        queryFn: () => fetchAnimeInfo(animeId)
    })

    if (isLoading) return (<LoadingPage />)
    if (isError) return (<h1>Error loading data!!!</h1>)
    const disqusConfig = {
        url: `https://kakoianime.vercel.app/anime/${data?.id}`,
        identifier: data?.id, // Single post id
        title: data?.title?.romaji || data?.title?.english // Single post title
    }

    return (
        <>
            {data && <section className="">
                <DetailsBanner {...data} />
                <AnimeInfo animeId={animeId} {...data} />
                <div className="py-10 px-3">
                    <DiscussionEmbed shortname="mangekyoreader" config={disqusConfig} />
                </div>
            </section>}
            {
                !data && (
                    <div className="grid place-items-center p-4">
                        <h1>Something Went Wrong. Please try again later</h1>
                        <Link className="text-blue-500 text-lg hover:underline" href={"/home"}>Go to Home Page</Link>
                    </div>
                )
            }
        </>
    )
}

export default AnimePage