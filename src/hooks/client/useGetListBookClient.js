import { getAllBookClient } from 'apis/product.api';
import { BOOKS_CLIENT } from 'constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBookClient = () => {
    const getListQuery = useQuery(BOOKS_CLIENT, getAllBookClient, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListBookClient;
