import { Grid, Tabs, Tab, Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentIcon from '@mui/icons-material/Payment';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import useGetListCart from '@/hooks/client/useGetListCart';
import { useMutation, useQueryClient } from 'react-query';

import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import useGetListAddress from '@/hooks/client/useGetListAddress';
import ItemTab from './tabs/ItemTab';
import PaymentTab from './tabs/PaymentTab';
import LinearProgress from '@mui/material/LinearProgress';

const CartItems: React.FunctionComponent = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isFetching, refetch } = useGetListCart();

  const handleChange = (event: any, newValue: any) => {
    setCurrentIndex(newValue);
  };
  console.log('%test', isLoading || isFetching);
  return (
    <>
      <Grid container sx={{ paddingBottom: '60px', position: 'relative' }}>
        <Grid item xs={12}>
          <Tabs
            value={currentIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
          >
            <Tab
              icon={<ShoppingCartIcon />}
              label="Giỏ"
              disabled={currentIndex !== 0}
            />

            <Tab
              icon={<PaymentIcon />}
              label="Thanh toán"
              disabled={currentIndex !== 1}
            />
          </Tabs>
        </Grid>
        {/* {(isLoading || isFetching) && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )} */}
        {/* tab 1 */}
        {currentIndex === 0 && (
          <ItemTab
            data={data}
            refetch={refetch}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
        {/* tab 2 */}
        {currentIndex === 1 && <PaymentTab data={data} />}

        {/* empty screen */}
        {data && data?.length === 0 && (
          <Grid item xs={12} sx={{ p: 30 }}>
            <EmptyCart />
          </Grid>
        )}
        {data && data?.length !== 0 && (
          <SubmitCart
            items={data || []}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        )}
      </Grid>
    </>
  );
};

export default CartItems;
