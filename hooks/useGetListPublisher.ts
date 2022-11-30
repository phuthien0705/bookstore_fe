import { getAllPublisher } from '../apis/publisher.api';
import { PUBLISHERS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListPublisher = () => {
  const getListQuery: any = useQuery(PUBLISHERS, getAllPublisher, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListPublisher;
