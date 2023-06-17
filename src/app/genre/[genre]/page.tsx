"use client";
import LoadingPage from "../../../components/LoadingPage";
import { useQuery } from "react-query";
// import { META } from "@consumet/extensions";

const Anime = ({ params }: any) => {
  // const { genre } = params;

  // const fetchAnimeByGenre = async (type: string) => {
  //   const Anilist = new META.Anilist();
  //   const results = await Anilist.fetchAnimeGenres([type]);
  //   console.log(results);
  //   return results;
  // };
  // const { data, isError, isLoading, status } = useQuery({
  //   queryKey: ["genreQuery", genre],
  //   queryFn: () => fetchAnimeByGenre(genre),
  // });
  // console.log(data);
  
  // if (isLoading) return <LoadingPage />;
  // if (isError) return <h1>Error loading data!!!</h1>;

  return <></>;
};

export default Anime;
