import { META } from "@consumet/extensions";
const getAnime = new META.Anilist();

export const fetchTAnime = async (pageParam: number) => {
  const results = await getAnime.fetchTrendingAnime(pageParam);
  return results;
};

export const fetchRAnime = async (pageParam: number) => {
  // const results = await fetchAnime('recent-episodes', 10, pageParam);
  const results = await getAnime.fetchRecentEpisodes("gogoanime", pageParam);
  return results;
};

export const fetchPAnime = async (pageParam: number, perPage: number) => {
  // const results = await fetchAnime('popular', 10, pageParam);
  const results = await getAnime.fetchPopularAnime(pageParam, perPage);
  return results;
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
