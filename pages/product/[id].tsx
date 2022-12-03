import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/client/useGetListBookDetail';
import useGetListBookClient from '../../hooks/client/useGetListBookClient';
import ProductLayout from '../../layout/ProductLayot';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/loading/LoadingScreen';

const sampleSpec = {
  id: 0,
  provider: 'Cty Sách Hương Giang',
  author: 'F Scott Fitzgerald',
  publisher: 'Thế Giới',
  totalpages: 200,
  weight: 550,
  datepublished: '06/2015',
};

const ProductDetail = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const getListBookDetailQuery = useGetListBookDetail(id);
  const getListBookQuery = useGetListBookClient();
  const { data, isLoading, isFetching, refetch } = getListBookDetailQuery;
  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = getListBookQuery;
  useEffect(() => {
    console.log(router?.query);
    if (router.isReady) {
      setId(router?.query?.id as any);
      refetch();
    }
  }, [refetch, router, setId]);
  console.log(data);
  if (isLoading || isSlideLoading) {
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
          <Stack direction="row" sx={{ p: 1 }}>
            <ProductInfo
              data={data?.data}
              isLoading={isLoading || isFetching}
            />
          </Stack>
          <Stack sx={{ p: { xs: 2, sm: 4 } }}>
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
                <Typography variant="h4">Nhà Cung Cấp</Typography>
                <Typography variant="h4">Tác giả</Typography>
                <Typography variant="h4">NXB</Typography>
                <Typography variant="h4">Số trang</Typography>
                <Typography noWrap variant="h4">
                  Trọng lượng (gr)
                </Typography>
                <Typography variant="h4">Năm XB</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2">{sampleSpec.provider}</Typography>
                <Typography variant="body2">{sampleSpec.author}</Typography>
                <Typography variant="body2">{sampleSpec.publisher}</Typography>
                <Typography variant="body2">{sampleSpec.totalpages}</Typography>
                <Typography variant="body2">{sampleSpec.weight}</Typography>
                <Typography variant="body2">
                  {sampleSpec.datepublished}
                </Typography>
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
