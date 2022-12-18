import AdminLayout from '@/layout/AdminLayout';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import useGetStatistic from '@/hooks/useGetStatistic';
import { partStatisticTime } from '@/utils/parseTime';
import TotalEarning from '@/components/statistics/TotalEarning';
import TotalOrder from '@/components/statistics/TotalOrder';
import TotalGrowth from '@/components/statistics/TotalGrowth';

const Statistic = () => {
  const date = new Date();
  const { data, isLoading, isFetching } = useGetStatistic({
    startDate: partStatisticTime(
      new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        date.getDate()
      ).toISOString()
    ),
    endDate: partStatisticTime(new Date().toISOString()),
  });
  console.log('data', data?.data);

  return (
    <AdminLayout>
      <Grid container spacing={2} sx={{ px: 1 }}>
        <Grid item xs={6}>
          <TotalEarning data={data?.data || []} />
        </Grid>
        <Grid item xs={6}>
          <TotalOrder data={data?.data || []} />
        </Grid>
        <Grid item xs={12}>
          <TotalGrowth data={data?.data || []} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default dynamic(() => Promise.resolve(Statistic), {
  ssr: false,
});
