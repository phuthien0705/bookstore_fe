import { CART_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getCartItems } from '@/apis/cart.api';

const useGetListCart = () => {
  const getListQuery: any = useQuery(CART_CLIENT, getCartItems, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListCart;
