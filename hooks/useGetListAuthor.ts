import { getAllAuthor } from '@/apis/author.api';
import { useQuery } from 'react-query';
import { AUTHORS } from '../constants/queryKeyName';

const useGetListAuthor = (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [AUTHORS, current_page],
    () => getAllAuthor(current_page, per_page, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListAuthor;
