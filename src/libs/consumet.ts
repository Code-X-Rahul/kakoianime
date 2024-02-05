import { axiosInstance } from "@/services/api";
import { META } from "@consumet/extensions";
const getAnime = new META.Anilist();

export const fetchTAnime = async (pageParam: number) => {
  // const results = await getAnime.fetchTrendingAnime(pageParam);
  const response = await axiosInstance.get("/meta/anilist/trending");

  return response.data;
};

export const fetchRAnime = async (pageParam: number) => {
  // const results = await fetchAnime('recent-episodes', 10, pageParam);
  // const results = await getAnime.fetchRecentEpisodes("gogoanime", pageParam);
  const response = await axiosInstance.get("/anime/gogoanime/recent-episodes");
  console.log(response.data);
  return response.data;
  // return results;
};

export const fetchPAnime = async (pageParam: number, perPage: number) => {
  // const results = await fetchAnime('popular', 10, pageParam);
  // const results = await getAnime.fetchPopularAnime(pageParam, perPage);
  const response = await axiosInstance.get("/meta/anilist/popular");
  return response.data;
};

// const fetchAnimeS = async () => {
//     const getAnime = new META.Anilist();
//     const results = await getAnime.fetchAiringSchedule();
//     return results
// }

export async function fetchByFilter(
  query: any,
  type: any,
  page: any,
  perPage: any,
  format: any,
  sort: any,
  genres: string[],
  id: any,
  year: any,
  status: any,
  season: any
) {
  const results = await getAnime.advancedSearch(
    query,
    type,
    page,
    perPage,
    format,
    sort,
    genres,
    id,
    year,
    status,
    season
  );
  // const genre = await getAnime.fetchAnimeGenres(genres);
  // console.log("genre :", genre);

  return results;
}

export const fetchRandomAnime = async ({ pageParam }: any) => {
  const results = await getAnime.fetchRandomAnime();
  return results;
};
