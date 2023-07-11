"use client";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";

type Props = {
  params: {
    genre: string;
  };
};

const SortOrder = {
  Action: "Action",
};

const page = ({ params }: Props) => {
  const { genre } = params;

  const datas = {
    genre: SortOrder.Action,
  };

  const fetchAnimeByGenre = async ({ genre, pageParam }: any) => {
    const url = "https://api.consumet.org/meta/anilist/advanced-search";
    try {
      const { data: results } = await axios.get(url);
      console.log(results);
      return results;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", genre],
    queryFn: () => fetchAnimeByGenre(genre),
  });

  return (
    <div>
      <h1 className="text-3xl text-white font-semibold m-4">Genre: {genre}</h1>
    </div>
  );
};

export default page;
