import { Box, Paper } from '@mui/material';
import ProductLayout from '../layout/ProductLayot';
import CartTitle from '../components/cart/CartTitle';
import CartItems from '../components/cart/CartItems';
import dynamic from 'next/dynamic';
import useGetListCart from '@/hooks/client/useGetListCart';

const Cart = () => {
  const { data, isloading, isFetching } = useGetListCart();
  console.log(data);
  return (
    <ProductLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 }, mb: 2 }}>
          <CartTitle />
        </Paper>
        <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 } }}>
          <CartItems />
        </Paper>
      </Box>
    </ProductLayout>
  );
};

export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
