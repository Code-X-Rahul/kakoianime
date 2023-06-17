'use client'
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
        const results = await fetchAnime('trending', 10, pageParam);
        return results
    }

    const fetchRAnime = async (pageParam) => {
        const results = await fetchAnime('recent-episodes', 10, pageParam);
        return results
    }

    const fetchPAnime = async (pageParam) => {
        const results = await fetchAnime('popular', 10, pageParam);
        return results
    }

    // const fetchAnimeS = async () => {
    //     const getAnime = new META.Anilist();
    //     const results = await getAnime.fetchAiringSchedule();
    //     return results
    // }


    const fetchAnimeInfo = async (id, pageNo) => {
        try {
            const url = `https://api.consumet.org/meta/anilist/info/${id}`;
            const { data } = await axios.get(url, { params: { page: pageNo } });
            const results = data
            return results
        } catch (err) {
            console.log(err)
        }
    };

    const QueryFn = (aid) => {
        const infoQuery = useQuery({
            queryKey: ['info', aid],
            queryFn: () => fetchAnimeInfo(aid)
        })
        return infoQuery
    }

    return (
        <AnimeContext.Provider value={{ QueryFn, fetchTAnime, fetchPAnime, fetchRAnime, }}>
            {children}
        </AnimeContext.Provider>
    );
}
