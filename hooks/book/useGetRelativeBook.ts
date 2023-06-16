import { IEachBookData } from '@/interfaces/book.interface';
import { getRelateBook } from '../../apis/product.api';
import { BOOKS_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetRelativeBook = (
  data: IEachBookData | undefined,
  enabled = true
) => {

  const bookId = data?.id as unknown as number
  
  const getListQuery = useQuery(BOOKS_CLIENT, () => getRelateBook(bookId), {
    refetchOnMount: true,
    keepPreviousData: true,
    enabled,
  });

  return getListQuery;
};

export default useGetRelativeBook;
