import { getAllAuthor } from '@/apis/author.api';
import { useQuery } from 'react-query';
import { AUTHORS } from '../constants/queryKeyName';

const useGetListAuthor = () => {
  const getListQuery: any = useQuery(AUTHORS, getAllAuthor, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListAuthor;
