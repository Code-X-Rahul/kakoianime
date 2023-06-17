"use client";
import LoadingPage from "../../../components/LoadingPage";
import { useQuery } from "react-query";
import { META } from "@consumet/extensions";

const Anime = ({ params }: any) => {
  const { genre } = params;

  const fetchAnimeByGenre = async (genre: string) => {
    const Anilist = new META.Anilist();
    const results = await Anilist.fetchAnimeGenres([genre]);
    console.log(results);
    
    return results;
  };
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["info", genre],
    queryFn: () => fetchAnimeByGenre(genre),
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <h1>Error loading data!!!</h1>;

  return <></>;
};

export default Anime;
