import { getAllAuthor } from 'apis/author.api';
import { AUTHORS } from 'constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListAuthor = () => {
    const getListQuery = useQuery(AUTHORS, getAllAuthor, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListAuthor;
