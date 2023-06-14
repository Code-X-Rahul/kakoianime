'use client'
import axios from "axios";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AnimeContext = createContext();


export function useAnime() {
    return useContext(AnimeContext);
}

export function AnimeProvider({ children }) {

    const fetchAnimeInfo = async (id) => {
        try {
            const url = `https://api.consumet.org/meta/anilist/info/${id}`;
            const { data } = await axios.get(url);
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
        <AnimeContext.Provider value={{ QueryFn, fetchTAnime, fetchPAnime, fetchRAnime, fetchAnimeS }}>
            {children}
        </AnimeContext.Provider>
    );
}
