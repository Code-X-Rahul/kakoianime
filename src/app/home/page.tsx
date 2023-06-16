"use client";
import Slider from "../../components/Slider";
import Card from "../../components/Card";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { useQuery } from "react-query";
import { useAnime } from "@/context/AnimeContext";
import LoadingPage from "@/components/LoadingPage";

const Home = () => {
  const { fetchPAnime, fetchRAnime, fetchTAnime } = useAnime()


  const trendingAnime = useQuery({
    queryKey: ["trendingQuery"],
    queryFn: () => fetchTAnime(),
  });
  const popularAnime = useQuery({
    queryKey: ["popularQuery"],
    queryFn: () => fetchPAnime(),
  });
  const recentAnime = useQuery({
    queryKey: ["recentQuery"],
    queryFn: () => fetchRAnime(),
  });

  if (
    trendingAnime.isLoading ||
    popularAnime.isLoading ||
    recentAnime.isLoading
  )
    return <LoadingPage />;
  if (trendingAnime.isError || popularAnime.isError || recentAnime.isError)
    return <h1>Error loading data!!!</h1>;

  return (
    <>
      <EmblaCarousel {...trendingAnime?.data} />
      <section className="bg-zinc-800 scroll-smooth">
        <Slider type={trendingAnime.data?.results} heading="Trending Anime" />
        <Slider type={popularAnime.data?.results} heading="Popular Anime" />
        <div className="flex justify-start items-center flex-col">
          <h1 className="text-3xl text-yellow-500 px-4 py-2 ">
            Recent Episodes
          </h1>
          <div className="grid gap-2 grid-cols-2 px-4 py-2 bg-zinc-800 h-auto md:grid-cols-4 lg:grid-cols-6">
            {recentAnime.data?.results?.map((anime: any) => (
              <Card key={anime?.id} height="full" width="100%" {...anime} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
