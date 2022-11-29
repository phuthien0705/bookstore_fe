import { getAllBook, getBookDetailById } from '../../apis/product.api';
import { BOOK_DETAIL } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBookDetail = (id) => {
    const getListQuery = useQuery([BOOK_DETAIL, id], () => getBookDetailById(id), {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListBookDetail;
