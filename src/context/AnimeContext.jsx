'use client'
import { META } from "@consumet/extensions";
import axios from "axios";
import { createContext, useContext } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const AnimeContext = createContext();


// const popularQuery = useInfiniteQuery({
//     queryKey: ["popularQuery"],
//     queryFn: ({ pageParam = 1 }) => fetchPAnime(pageParam),
//     getNextPageParam: (lastPage, allPages) => {
//         const nextPage = lastPage.hasNextPage === true ? allPages.length + 1 : undefined;
//         return nextPage;
//     },
// });

export function useAnime() {
    return useContext(AnimeContext);
}

export function AnimeProvider({ children }) {
    const fetchAnime = async (type, perPage, pageNo) => {
        let url = `https://api.consumet.org/meta/anilist/${type}`;
        try {
            const { data } = await axios.get(url, {
                params: {
                    page: pageNo,
                    perPage: perPage
                }
            });
            const results = data
            return results;
        } catch (err) {
            throw new Error(err);
        }
    };


    const fetchTAnime = async (pageParam) => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchTrendingAnime();
        return results
        return results
    }

    const fetchRAnime = async (pageParam) => {
        // const results = await fetchAnime('recent-episodes', 10, pageParam);
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchRecentEpisodes();
        return results
    }

    const fetchPAnime = async (pageParam) => {
        // const results = await fetchAnime('popular', 10, pageParam);
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchPopularAnime();
        return results
    }

    // const fetchAnimeS = async () => {
    //     const getAnime = new META.Anilist();
    //     const results = await getAnime.fetchAiringSchedule();
    //     return results
    // }


    return (
        <AnimeContext.Provider value={{ fetchTAnime, fetchPAnime, fetchRAnime, }}>
            {children}
        </AnimeContext.Provider>
    );
}
