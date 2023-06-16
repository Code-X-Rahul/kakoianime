'use client'
import axios from "axios";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AnimeContext = createContext();


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


    const fetchTAnime = async () => {
        const results = await fetchAnime('trending', 10, 1);
        return results
    }

    const fetchRAnime = async () => {
        const results = await fetchAnime('recent-episodes', 10, 1);
        return results
    }

    const fetchPAnime = async () => {
        const results = await fetchAnime('popular', 10, 1);
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
