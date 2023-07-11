import axios from "axios";
import { useQuery } from "react-query";
import LoadingPage from "./LoadingPage";
import Player from "./Player";
import { DiscussionEmbed } from "disqus-react";

const Watch = ({ animeId, episodeId }: {
    animeId: string | number
    episodeId: string | number
}) => {

    const fetchEpisodeInfo = async (id: string | number) => {
        const url = `https://api.consumet.org/meta/anilist/watch/${id}`;
        const { data } = await axios.get(url);
        const results = data;
        // const getEpisodes = new META.Anilist();
        // const results = await getEpisodes.fetchEpisodeSources(id);
        console.log(results);

        return results;
    };

    const eInfoQuery = useQuery({
        queryKey: ["eInfo", episodeId],
        queryFn: () => fetchEpisodeInfo(episodeId),
    });

    if (eInfoQuery.isLoading) return <LoadingPage />;
    if (eInfoQuery.isError) return <h1>Error loading data!!!</h1>;

    const disqusConfig = {
        url: `https://kakoianime.vercel.app/anime/${animeId}/watch/${episodeId}`,
        identifier: episodeId as string, // Single post id
        title: episodeId as string, // Single post title
    };
    return (
        <>
            {eInfoQuery.status === "success" && (
                <Player
                    option={""}
                    animeStreamInfo={eInfoQuery.data}
                    getInstance={(art: any) => console.info(art)}
                />
            )}
            <DiscussionEmbed shortname="mangekyoreader" config={disqusConfig} />
            </>
    )
}

export default Watch