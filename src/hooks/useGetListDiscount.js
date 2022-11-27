import { getAllDiscount } from 'apis/discount.api';
import { DISCOUNTS } from 'constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListDiscount = () => {
    const getListQuery = useQuery(DISCOUNTS, getAllDiscount, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return getListQuery;
};

export default useGetListDiscount;
