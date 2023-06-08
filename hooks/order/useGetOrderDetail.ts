import { getOrderDetail } from '../../apis/order.api';
import { ORDER_DETAIL } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetOrderDetail = (
  id: string | string[] | undefined,
  enabled: boolean
) => {
  const getListQuery: any = useQuery(
    [ORDER_DETAIL, id],
    () => getOrderDetail(id),
    {
      refetchOnMount: true,
      keepPreviousData: true,
      enabled,
    }
  );

  return getListQuery;
};
export default useGetOrderDetail;
