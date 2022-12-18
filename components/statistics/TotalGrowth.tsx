import { ITotalGrowth } from '@/interfaces/compontents/statistic.interface';
import { moneyFormat } from '@/utils/moneyFormat';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TotalGrowth: React.FunctionComponent<ITotalGrowth> = ({ data }) => {
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
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, color: '#000' }}>
          Tăng trưởng tổng thể
        </Typography>
      </Box>
      <Chart
        options={chartInfo.options}
        series={chartInfo.series}
        type="line"
        width="700"
      />
    </Box>
  );
};

export default TotalGrowth;
