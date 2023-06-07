import { getAllAuthor } from '@/apis/author.api';
import { useQuery } from 'react-query';
import { AUTHORS } from '../../constants/queryKeyName';

const useGetListAuthor = (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery = useQuery(
    [AUTHORS],
    () => getAllAuthor(page, limit, searchFields, value),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListAuthor;
