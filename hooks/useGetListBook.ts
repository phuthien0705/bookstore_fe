import { getAllBook } from '../apis/product.api';
import { BOOKS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBook = (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [BOOKS, current_page],
    () => getAllBook(current_page, per_page, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListBook;
