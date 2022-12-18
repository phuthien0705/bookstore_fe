import { useState } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import useGetStatistic from '@/hooks/useGetStatistic';
import { partStatisticTime } from '@/utils/parseTime';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Statistic = () => {
  const date = new Date();
  const { data, isLoading, isFetching } = useGetStatistic({
    startDate: partStatisticTime(
      new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString()
    ),
    endDate: partStatisticTime(new Date().toISOString()),
  });
  console.log('data', data?.data);
  const chartInfo = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <AdminLayout>
      <Typography sx={{ mb: 1, color: '#000' }}>Thống kê doanh thu</Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: 'fit-content',
          p: '8px',
          borderRadius: '8px',
        }}
      >
        <Chart
          options={chartInfo.options}
          series={chartInfo.series}
          type="bar"
          width="500"
        />
      </Box>
    </AdminLayout>
  );
};

export default dynamic(() => Promise.resolve(Statistic), {
  ssr: false,
});
