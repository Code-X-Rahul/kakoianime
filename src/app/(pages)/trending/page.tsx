'use client'
import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query';
import { fetchTAnime } from '@/libs/consumet';
import Card from '@/components/Card';
import LoadingPage from '@/components/LoadingPage';

const TrendingPage = () => {
    const bottom = useRef(null);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess
    } = useInfiniteQuery({
        queryKey: ["iTrendingQuery"],
        queryFn: ({ pageParam = 1 }) => fetchTAnime(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                lastPage.hasNextPage === true ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        });
        if (bottom?.current) {
            observer.observe(bottom.current);
        }
        return () => {
            if (bottom.current) {
                observer.unobserve(bottom.current);
            }
        };
    }, [bottom]);

    if (isError) return <h1>Something Went Wrong...</h1>
    if (isLoading) return <LoadingPage />

    return (
        <>
            <div className="grid grid-cols-2 gap-3 p-2 py-4 bg-zinc-800 md:grid-cols-4 lg:grid-cols-6">

                {
                    data?.pages.map((page) => (
                        page.results.map((anime: any) => <Card key={anime?.id} {...anime} />)
                    ))
                }
            </div>
            {isFetchingNextPage &&
                <h1 className='text-2xl text-white'>Loading....</h1>
            }
            <div ref={bottom} />
        </>
    )
}

export default TrendingPage