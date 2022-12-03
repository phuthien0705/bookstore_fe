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
interface IProductInfo {
  data: any;
  isLoading: boolean;
}
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
    <Grid
      container
      sx={{ pt: { xs: 2, sm: 4 }, pl: { xs: 2, sm: 4 }, pr: { xs: 2, sm: 4 } }}
    >
      <Grid item xs={12} sm={4} md={6} sx={{}}>
        <Box
          sx={{
            width: { xs: '100%' },
            height: { xs: '100%' },
            borderRadius: '10px',
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={'100%'} />
          ) : (
            <img
              src={data?.book_image}
              alt={data?.name}
              width="100%"
              height="100%"
              style={{ borderRadius: '10px', objectFit: 'contain' }}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <Grid container sx={{ marginLeft: { xs: 0, sm: '1rem', md: '2rem' } }}>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}
          >
            <Stack direction="column" spacing={1}>
              <Chip
                variant="outlined"
                label="In Stock"
                size="small"
                color="success"
                sx={{ width: '10%' }}
              />
              <Typography variant="h3">{data?.name}</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}
          >
            <Typography variant="body1">{data?.description}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}
          >
            <Stack direction="row" spacing={1}>
              <Rating value={data?.rating} precision={0.5} readOnly />
              <Typography variant="body1">(69+)</Typography>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}
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
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
