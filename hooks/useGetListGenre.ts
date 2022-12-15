import { getAllGenre } from '../apis/genre.api';
import { GENRES } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListGenre = (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    GENRES,
    () => getAllGenre(current_page, per_page, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListGenre;
