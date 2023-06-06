import { getOrderOfClient } from '@/apis/order.api';
import { useQuery } from 'react-query';
import { ORDERS_CLIENT } from '../../constants/queryKeyName';

const useGetListOrder = (page: number, limit = 10) => {
  const getListQuery: any = useQuery(
    [ORDERS_CLIENT],
    () => getOrderOfClient(page, limit),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListOrder;
