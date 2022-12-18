import { getTopSelling } from '@/apis/product.api';
import { TOP_SELLING } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetTopSelling = () => {
  const getListQuery: any = useQuery(TOP_SELLING, () => getTopSelling(), {
    refetchOnMount: true,
    keepPreviousData: true,
  });

  return getListQuery;
};

export default useGetTopSelling;
