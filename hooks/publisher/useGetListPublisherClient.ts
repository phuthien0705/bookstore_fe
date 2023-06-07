import { getAllPublisherClient } from '../../apis/publisher.api';
import { PUBLISHERS_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListPublisherClient = () => {
  const getListQuery = useQuery(PUBLISHERS_CLIENT, getAllPublisherClient, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListPublisherClient;
