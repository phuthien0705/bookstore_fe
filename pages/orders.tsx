import ProductLayout from '@/layout/ProductLayot';
import MainCard from '@/components/cards/MainCard';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  IconButton,
  Button,
  Popper,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  ButtonGroup,
  Drawer,
  Stack,
  Link,
} from '@mui/material';
import OrderTitle from '@/components/orders/OrderTitle';
import OrderTable from '@/components/orders/OrderTable';
const fakedata = [
  {
    id: 1,
    name: 'Kiếp Người - Vĩnh Cửu Và Vô Thường ',
    book_image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/94/8e/0a/a6db5014ecbea5502aff79e3b9f3cd81.jpg',
    price: '30000',
    quantity: 3,
  },
  {
    id: 2,
    name: 'Kiếp Người - Vĩnh Cửu Và Vô Thường ',
    book_image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/94/8e/0a/a6db5014ecbea5502aff79e3b9f3cd81.jpg',
    price: '50000',
    quantity: 3,
  },
  {
    id: 3,
    name: 'Kiếp Người - Vĩnh Cửu Và Vô Thường ',
    book_image:
      'https://salt.tikicdn.com/cache/w1200/ts/product/94/8e/0a/a6db5014ecbea5502aff79e3b9f3cd81.jpg',
    price: '60000',
    quantity: 3,
  },
];
const OrdersHistory = () => {
  return (
    <>
      <ProductLayout>
        <Container maxWidth="md" disableGutters>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 }, mb: 2 }}>
              <OrderTitle />
            </Paper>
            <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 } }}>
              <OrderTable items={fakedata} />
            </Paper>
          </Box>
        </Container>
      </ProductLayout>
    </>
  );
};
export default OrdersHistory;
