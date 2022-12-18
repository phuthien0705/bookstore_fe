import { STATISTICS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getStatistic } from '@/apis/statistic.api';
import { partStatisticTime } from '@/utils/parseTime';

const useGetStatistic = ({
  startDate = partStatisticTime(new Date().toISOString()),
  endDate = partStatisticTime(new Date().toISOString()),
}: {
  startDate: string;
  endDate: string;
}) => {
  const getListQuery: any = useQuery(
    STATISTICS,
    () => getStatistic({ startDate, endDate }),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetStatistic;
