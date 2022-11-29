import { getAllGenreClient } from '../../apis/genre.api';
import { GENRES_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListGenreClient = () => {
    const getListQuery = useQuery(GENRES_CLIENT, getAllGenreClient, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListGenreClient;
