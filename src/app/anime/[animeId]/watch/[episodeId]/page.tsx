'use client'

import { useQuery } from "react-query";
import axios from "axios";
import { useAnime } from "../../../../../context/AnimeContext";
import Player from "../../../../../components/Player";
import AnimeInfo from "../../../../../components/AnimeInfo";
import { DiscussionEmbed } from "disqus-react";
import LoadingPage from "../../../../../components/LoadingPage";

const Watch = ({ params }: any) => {
  const { episodeId, animeId } = params;

  const { QueryFn } = useAnime();
  const info = QueryFn(animeId);

  const fetchEpisodeInfo = async (id: string | Number) => {
    const url = `https://api.consumet.org/meta/anilist/watch/${id}`;
    const { data } = await axios.get(url);
    const results = data;
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
    url: `https://mangekyoreader.netlify.app/anime/${animeId}/watch/${episodeId}`,
    identifier: episodeId, // Single post id
    title: episodeId, // Single post title
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
      <div>
        <h1 className="text-2xl font-bold text-center">
          {info?.data?.title?.romaji}
        </h1>
      </div>
      {info && (
        <div className="">
          <AnimeInfo info={info} animeId={animeId} />
        </div>
      )}
      <div className="py-10 px-3">
        <DiscussionEmbed shortname="mangekyoreader" config={disqusConfig} />
      </div>
    </>
  );
};

export default Watch;
