"use client";
import Slider from "../../components/Slider";
import Card from "../../components/Card";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { useInfiniteQuery, useQuery } from "react-query";
import LoadingPage from "@/components/LoadingPage";
// import { useAuth } from "@/context/UserContext";
import { fetchPAnime, fetchRAnime, fetchTAnime } from "@/libs/consumet";

const Home = () => {
  // const { logout } = useAuth()
  const trendingAnime = useQuery({
    queryKey: ["trendingQuery"],
    queryFn: () => fetchTAnime(1),
  });

  const popularQuery = useQuery({
    queryKey: ["popularQuery"],
    queryFn: () => fetchPAnime(1, 10),
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
      {/* <button onClick={logout}>
        Logout
      </button> */}
      <section className="scroll-smooth">
        <Slider type={trendingAnime?.data?.results} heading="Trending Anime" />
        <Slider type={popularQuery?.data?.results} heading="Popular Anime" />
        <div className="flex justify-start items-center flex-col">
          <h1 className="text-3xl text-yellow-500 px-4 py-2 ">
            Recent Episodes
          </h1>
          <div className="grid gap-4 grid-cols-2 px-4 py-2  h-auto md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {recentAnime?.pages?.map((page: any) =>
              page?.results.map((anime: any, idx: any) => (
                <Card key={`${anime?.id}${idx}`} height="full" width="100%" {...anime} />
              ))
            )}
          </div>
        </div>
        <button
          onClick={fetch}
          className="text-2xl text-slate-100 p-5 w-full"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More...."}
        </button>
      </section>
    </>
  );
};

export default Home;
