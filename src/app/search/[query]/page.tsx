"use client";
import Card from "@/components/Card";
import { useQuery } from "react-query";
import LoadingPage from "@/components/LoadingPage";
import axios from "axios";

const SearchPage = ({ params }: any) => {
  const { query } = params;

  const fetchAnime = async (id: string, pageNo: Number) => {
    const url = `https://api.consumet.org/meta/anilist/${id}`;
    try {
      const { data } = await axios.get(url, { params: { page: pageNo || 1 } });
      const results = data;
      return results;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  const seachQuery = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchAnime(query, 1),
  });

  if (seachQuery.isLoading) return <LoadingPage />;
  if (seachQuery.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div className="grid grid-cols-2 gap-3 p-2 py-4 bg-zinc-800 md:grid-cols-4 lg:grid-cols-6">
      {seachQuery?.data?.results.map((anime: any) => (
        <Card key={anime?.id} {...anime} />
      ))}
    </div>
  );
};

export default SearchPage;
