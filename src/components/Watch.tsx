import { axiosInstance } from "@/services/api";
import { DiscussionEmbed } from "disqus-react";
import { useQuery } from "react-query";
import LoadingPage from "./LoadingPage";
import Player from "./Player";

const Watch = ({
  animeId,
  episodeId,
}: {
  animeId: string | number;
  episodeId: string | number;
}) => {
  const fetchEpisodeInfo = async (id: string | number) => {
    const { data } = await axiosInstance.get(`/meta/anilist/watch/${id}`);
    return data;
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
  );
};

export default Watch;
