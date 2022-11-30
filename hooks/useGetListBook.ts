import { getAllBook } from '../apis/product.api';
import { BOOKS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBook = () => {
  const getListQuery: any = useQuery(BOOKS, getAllBook, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListBook;
