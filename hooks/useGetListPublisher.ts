import { getAllPublisher } from '../apis/publisher.api';
import { PUBLISHERS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListPublisher = (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [PUBLISHERS, current_page],
    () => getAllPublisher(current_page, per_page, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListPublisher;
