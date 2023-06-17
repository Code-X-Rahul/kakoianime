"use client";
import Slider from "../../components/Slider";
import Card from "../../components/Card";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAnime } from "@/context/AnimeContext";
import LoadingPage from "@/components/LoadingPage";

const Home = () => {
  const { fetchPAnime, fetchRAnime, fetchTAnime } = useAnime();

  const trendingAnime = useQuery({
    queryKey: ["trendingQuery"],
    queryFn: () => fetchTAnime(),
  });

  const popularQuery = useQuery({
    queryKey: ["popularQuery"],
    queryFn: () => fetchPAnime(),
  });

  const {
    data: recentAnime,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recentQuery"],
    queryFn: ({ pageParam = 1 }) => fetchRAnime(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.hasNextPage === true ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const fetch = () => {
    fetchNextPage();
  };

  if (trendingAnime.isLoading || popularQuery.isLoading || isLoading)
    return <LoadingPage />;

  if (trendingAnime.isError || isError)
    return <h1>Error loading trendingAnime or recentAnime!!!</h1>;

  if (popularQuery.isError) return <h1>Error loading popularAnime!!!</h1>;

  return (
    <>
      <EmblaCarousel {...trendingAnime?.data} />
      <section className="scroll-smooth">
        <Slider type={trendingAnime?.data?.results} heading="Trending Anime" />
        <Slider type={popularQuery?.data?.results} heading="Popular Anime" />
        <div className="flex justify-start items-center flex-col">
          <h1 className="text-3xl text-yellow-500 px-4 py-2 ">
            Recent Episodes
          </h1>
          <div className="grid gap-2 grid-cols-2 px-4 py-2  h-auto md:grid-cols-4 lg:grid-cols-6">
            {recentAnime?.pages?.map((page: any) =>
              page?.results.map((anime: any) => (
                <Card key={anime?.id} height="full" width="100%" {...anime} />
              ))
            )}
          </div>
        </div>
        <button
          onClick={fetch}
          className="text-2xl text-slate-100 p-5 w-full"
          disabled={!hasNextPage||isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More...."}
        </button>
    </section>
    </>
  );
};

export default Home;
