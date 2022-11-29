import { getAllGenre } from '../apis/genre.api';
import { GENRES } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListGenre = () => {
    const getListQuery = useQuery(GENRES, getAllGenre, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListGenre;
