import { useState } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Statistic = () => {
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
      <Typography>hello this is statistic page</Typography>
      <Box>
        {/* {typeof window !== 'undefined' && (
          <Chart
            options={chartInfo.options}
            series={chartInfo.series}
            type="bar"
            width="500"
          />
        )} */}
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
