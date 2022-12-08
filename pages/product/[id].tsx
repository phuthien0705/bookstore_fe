import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/client/useGetListBookDetail';
import useGetListBookClient from '../../hooks/client/useGetListBookClient';
import ProductLayout from '../../layout/ProductLayot';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/loading/LoadingScreen';

const ProductDetail = () => {
  const router = useRouter();
  const [id, setId] = useState(null);

  const { data, isLoading, isFetching, refetch } = useGetListBookDetail(
    id,
    !!id
  );

  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetListBookClient();
  useEffect(() => {
    console.log(router?.query);
    if (router.isReady) {
      setId(router?.query?.id as any);
    }
  }, [router, setId]);
  console.log(data);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <Paper
          sx={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Stack direction="row" sx={{ p: 1 }}>
              <ProductInfo data={data} isLoading={isLoading} />
            </Stack>
            <Stack sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
              <Typography
                variant="h3"
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                Thông tin sản phẩm
              </Typography>
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 4 }}
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                <Stack direction="column" spacing={1}>
                  {' '}
                  <Typography variant="h4">Mã sách</Typography>
                  <Typography variant="h4">Tác giả</Typography>
                  <Typography variant="h4">Nhà xuất bản</Typography>
                  <Typography variant="h4">Số trang</Typography>
                  <Typography noWrap variant="h4">
                    Thể loại
                  </Typography>
                  <Typography variant="h4">Số lượng còn lại</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">{data?.isbn}</Typography>{' '}
                  {/* render authors */}
                  <Typography variant="body2">
                    {data &&
                      data?.authors.map((author: any, _index: number) => {
                        if (_index === data?.authors.length - 1)
                          return <span key={_index}>{author?.name}</span>;
                        return <span key={_index}>{author?.name}, </span>;
                      })}
                  </Typography>
                  <Typography variant="body2">
                    {data && data?.publisher?.name}
                  </Typography>{' '}
                  <Typography variant="body2">{data?.total_pages}</Typography>
                  {/* render genres */}
                  <Typography variant="body2">
                    {data &&
                      data?.genres.map((genre: any, _index: number) => {
                        if (_index === data?.genres.length - 1)
                          return <span key={_index}>{genre?.name}</span>;
                        return <span key={_index}>{genre?.name}, </span>;
                      })}{' '}
                  </Typography>
                  <Typography variant="body2">
                    {data && data?.available_quantity}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack direction="column">
          <Typography variant="h3" sx={{ py: 2 }}>
            Sản phẩm liên quan{' '}
          </Typography>
          <ProductSlides
            slideData={slideData}
            isSlideLoading={isSlideLoading}
            isSlideFetching={isSlideFetching}
          />
        </Stack>
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
