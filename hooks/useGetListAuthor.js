import { useQuery } from 'react-query';
import { getAllAuthorClient } from '../apis/author.api';
import { AUTHORS } from '../constants/queryKeyName';

const useGetListAuthor = () => {
    const getListQuery = useQuery(AUTHORS, getAllAuthorClient, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListAuthor;
