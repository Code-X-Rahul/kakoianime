import { META } from '@consumet/extensions';
import Card from '@/components/Card';
import { useQuery } from 'react-query';
import LoadingPage from '@/components/LoadingPage';

const SearchPage = ({param}:any) => {
    const {query} = param
    const fetchAnime = async (id:string) => {
        const AnimeList = new META.Anilist();
        const results = await AnimeList.search(id);
        return results
    }
    const seachQuery = useQuery({
        queryKey: ['search', query],
        queryFn: () => fetchAnime(query)
    })


    if (seachQuery.isLoading) return (<LoadingPage />)
    if (seachQuery.isError) return (<h1>Error loading data!!!</h1>)

    return (
        <div className='grid grid-cols-2 gap-3 p-2 py-4 bg-zinc-800'>
            {seachQuery?.data?.results.map((manga) => <Card key={manga?.id} {...manga} />)}
        </div>
    )
}

export default SearchPage
