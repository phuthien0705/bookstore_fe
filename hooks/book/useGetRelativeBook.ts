import { IEachBookData } from '@/interfaces/book.interface';
import { getRelateBook } from '../../apis/product.api';
import { BOOKS_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetRelativeBook = (
  data: IEachBookData | undefined,
  enabled = true
) => {
  let genres = '';
  data &&
    data?.genres?.forEach((genre: any, _index: number) => {
      if (_index === data?.genres?.length - 1) {
        genres += genre?.id;
      } else {
        genres += genre?.id + '_';
      }
    });
  const getListQuery = useQuery(BOOKS_CLIENT, () => getRelateBook(genres), {
    refetchOnMount: true,
    keepPreviousData: true,
    enabled,
  });

  return getListQuery;
};

export default useGetRelativeBook;
