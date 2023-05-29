import Head from 'next/head';
import { Box, Pagination, Stack, Typography, useTheme } from '@mui/material';
import ProductLayout from '@/layout/ProductLayot';
import useGetListPost from '@/hooks/post/useGetListPost';
import { newTimeStamp } from '@/common/timestamp';

export default function blogs() {
  const {
    queryReturn: { data, isLoading },
    page,
    setPage,
  } = useGetListPost();
  const theme = useTheme();
  console.log('$test', data);
  return (
    <>{data?.datas &&
      data.datas.map((item) => {
        return (
          <Stack key={item.id} spacing={theme.spacing(1)}>
            <Typography
              sx={{ fontWeight: 700, fontSize: '24px', color: '#000' }}
            >
              {item.title}
            </Typography>
            <Stack direction={'row'}>
              {/* <Box>
                {newTimeStamp(item.)}
              </Box> */}
            </Stack>
            <Typography></Typography>
          </Stack>
        );
      })}
      <Head>
        <title>Bài viết</title>
      </Head>
      <ProductLayout>
        <Stack spacing={theme.spacing(2)}>
          {data?.datas &&
            data.datas.map((item) => {
              return (
                <Stack key={item.id} spacing={theme.spacing(1)}>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: '24px', color: '#000' }}
                  >
                    {item.title}
                  </Typography>
                  <Stack direction={'row'}>
                    {/* <Box>
                    {newTimeStamp(item.)}
                  </Box> */}
                  </Stack>
                  <Typography></Typography>
                </Stack>
              );
            })}
        </Stack>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1.5 }}
        >
          <Pagination
            className="shadow"
            sx={{ p: 2, borderRadius: '6px' }}
            variant="outlined"
            shape="rounded"
            color="primary"
            count={data?.totalPages ?? 0}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
      </ProductLayout>
    </>
  );
}
