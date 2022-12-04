import {
  Grid,
  Stack,
  ButtonBase,
  Button,
  Typography,
  Rating,
  Chip,
  Box,
  Skeleton,
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { FC, useCallback } from 'react';
import { addToCart } from '@/apis/cart.api';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { LoadingButton } from '@mui/lab';
import Image from 'next/image';
import { IProductInfo } from '@/interfaces/compontents/product.interface';

const ProductInfo: FC<IProductInfo> = ({ data, isLoading }) => {
  console.log(data);
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const { mutate: addToCartFunc, isLoading: isLoadingAddToCart } = useMutation(
    () => addToCart({ book_id: data?.id, quantity: 1 }),
    {
      onSuccess: () => {
        toast({
          type: 'success',
          message: 'Thêm sản phẩm thành công',
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thêm sản phẩm',
        });
      },
    }
  );

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{ pt: { xs: 2, sm: 4 }, pl: { xs: 2, sm: 4 }, pr: { xs: 2, sm: 4 } }}
      spacing={2}
    >
      <Box>
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            height: { xs: '100%', md: '100%' },
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={'100%'} />
          ) : (
            <Image
              priority
              layout={'responsive'}
              width={300}
              height={500}
              src={data?.book_image}
              alt={data?.name}
              style={{ borderRadius: '10px' }}
            />
          )}
        </Box>
      </Box>
      <Box>
        <Grid container sx={{ marginLeft: { xs: 0, sm: '1rem', md: '2rem' } }}>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Typography variant="h3" fontSize="24px" fontWeight="500">
              {data?.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Typography variant="body1">{data?.description}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Stack direction="row" spacing={1}>
              <Rating value={data?.rating} precision={0.5} readOnly />
              <Typography variant="body1">(69+)</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Typography
              sx={{ fontSize: '32px', color: '#000', fontWeight: 500 }}
            >
              {data?.price} đ
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ display: 'flex', columnGap: 2, rowGap: 2 }}
            >
              <LoadingButton
                onClick={() => {
                  addToCartFunc();
                }}
                loading={isLoadingAddToCart}
                variant="contained"
                color="secondary"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: '8px',
                }}
              >
                <ShoppingCartOutlined />
                Thêm vào giỏ hàng
              </LoadingButton>
              <Button variant="contained">Mua ngay</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
