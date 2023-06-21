"use client";
import LoadingPage from "../../../components/LoadingPage";
import { useQuery } from "react-query";
import { META } from "@consumet/extensions";

const Anime = ({ params }: any) => {
  const { genre } = params;
  console.log(genre);
  const genreArr = []
  genreArr.push(genre)
  const fetchAnimeByGenre = async (genre:any) => {
    const Anilist = new META.Anilist();
    const results = await Anilist.fetchAnimeGenres(genre);
    console.log(results);
    return results;
  };
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["genreQuery", genreArr],
    queryFn: () => fetchAnimeByGenre(genre),
  });
  console.log(data);

  if (isLoading) return <LoadingPage />;
  if (isError) return <h1>Error loading data!!!</h1>;

  return <></>;
};

export default Anime;
