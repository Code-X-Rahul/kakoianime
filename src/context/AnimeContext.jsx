'use client'
import { META } from "@consumet/extensions";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AnimeContext = createContext();


export function useAnime() {
    return useContext(AnimeContext);
}

export function AnimeProvider({ children }) {


    const fetchTAnime = async () => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchTrendingAnime();
        return results
    }

    const fetchRAnime = async () => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchRecentEpisodes();
        return results
    }

    const fetchPAnime = async () => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchPopularAnime();
        return results
    }

    const fetchAnimeS = async () => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchAiringSchedule();
        return results
    }

    const fetchAnimeInfo = async (id) => {
        const getAnime = new META.Anilist();
        const results = await getAnime.fetchAnimeInfo(id);
        return results
    }


    const QueryFn = (aid) => {
        const infoQuery = useQuery({
            queryKey: ['info', aid],
            queryFn: () => fetchAnimeInfo(aid)
        })
        return infoQuery
    }




    return (
        <AnimeContext.Provider value={{ QueryFn, fetchTAnime, fetchPAnime, fetchRAnime, fetchAnimeS }}>
            {children}
        </AnimeContext.Provider>
    );
}
