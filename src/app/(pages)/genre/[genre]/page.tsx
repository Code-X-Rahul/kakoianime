"use client";
import { useInfiniteQuery, useQuery } from "react-query";
import Loading from '@/loading';
import { fetchByFilter } from "@/libs/consumet";
import FilterSelect from "@/components/FilterSelect";
import { useState } from "react";
import {
  genresArr,
  formatArr,
  statusArr,
  seasonArr
} from '@/utils/filters'

const data = {
  query: null,
  type: null,
  page: null,
  perPage: null,
  format: null,
  sort: null,
  genres: null,
  id: null,
  year: null,
  status: null,
  season: null,
}

function FetchByGenre({ params, searchParams }: {
  params: {
    genre: string;
  };
  searchParams: {
    id: string;
  };
}) {
  const { genre } = params;
  const { id } = searchParams;
  const [type, setType] = useState<string | undefined>()
  const [genres, setGenres] = useState<string[]>([])
  const [season, setSeason] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()

  const Genres = [genre];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["genre", Genres],
    queryFn: () => fetchByFilter(undefined, undefined, undefined, undefined, undefined, undefined, Genres, undefined, undefined, undefined, undefined),
  });


  if (isLoading) return <h1>Loading...</h1>;
  console.log(genre, ":", data);


  return (
    <div>
      <div className='text-slate-100 p-4'>
        <FilterSelect setState={setType} placeholder={"Type"} array={formatArr} />
        <FilterSelect setState={setSeason} placeholder={"Season"} array={seasonArr} />
        <FilterSelect setState={setStatus} placeholder={"Status"} array={statusArr} />
        <FilterSelect setState={setGenres} placeholder={"Genres"} array={genresArr} />
      </div>
      <h1 className="text-3xl text-white font-semibold m-4">Genre: {genre}{id}</h1>
    </div >
  );
}

export default FetchByGenre;
