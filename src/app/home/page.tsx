import Slider from "../../components/Slider";
import Card from "../../components/Card";
import axios from "axios";

const fetchAnime = async (
  type: string,
  perPage: Number | undefined,
  pageNo: Number | undefined
) => {
  let url: string;
  if (type === "trending") {
    url = "https://api.consumet.org/meta/anilist/trending";
  } else if (type === "popular") {
    url = "https://api.consumet.org/meta/anilist/popular";
  } else if (type === "recent") {
    url = "https://api.consumet.org/meta/anilist/recent-episodes";
  } else {
    url = "https://api.consumet.org/meta/anilist/trending";
  }
  try {
    const { data } = await axios.get(url, {
      params: {
        page: pageNo,
        perPage: perPage,
      },
    });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const Home = async () => {
  const trendingData = await fetchAnime("trending", 20, 1);
  const popularData = await fetchAnime("popular", 20, 1);
  const recentData = await fetchAnime("recent", 20, 1);
  const scheduleData = await fetchAnime("schedule", 20, 1);

  return (
    <>
      <section className="bg-zinc-800 scroll-smooth">
        <Slider type={trendingData?.results} heading="Trending Anime" />
        <Slider type={popularData?.results} heading="Popular Anime" />
        <div className="flex justify-start items-center flex-col">
          <h1 className="text-3xl text-yellow-500 px-4 py-2 ">
            Recent Episodes
          </h1>
          <div className="grid gap-2 grid-cols-2 px-4 py-2 bg-zinc-800 h-auto md:grid-cols-4 lg:grid-cols-6">
            {recentData?.results?.map((anime: any) => (
              <Card key={anime?.id} height="full" width="100%" {...anime} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
