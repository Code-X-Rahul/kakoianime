"use client";
import Card from "@/components/Card";
import { useInfiniteQuery, useQuery } from "react-query";
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
  const {
    data: searchQuery,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => fetchAnime(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.hasNextPage === true ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const fetch = () => {
    fetchNextPage();
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <h1>Error loading data!!!</h1>;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-2 py-4 bg-zinc-800 md:grid-cols-4 lg:grid-cols-6">
        {searchQuery?.pages.map((page: any) =>
          page?.results.map((anime: any) => <Card key={anime?.id} {...anime} />)
        )}
      </div>
      <button
        onClick={fetch}
        className="text-2xl text-slate-100 p-5 bg-zinc-900 w-full"
        disabled={!hasNextPage}
      >
        Load More....
      </button>
      {isFetchingNextPage && <h1>Loading...</h1>}
    </>
  );
};

export default SearchPage;
