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
    product: [
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
        name: 'Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt',
        book_image:
          'https://salt.tikicdn.com/cache/w1200/ts/product/09/2b/e4/e220a9a28a35a7c6ed3336e89c09178b.jpg',
        price: '82000',
        quantity: 4,
      },
    ],
  },
  {
    id: 2,
    product: [
      {
        id: 1,
        name: 'Kiếp Người - Vĩnh Cửu Và Vô Thường ',
        book_image:
          'https://salt.tikicdn.com/cache/w1200/ts/product/94/8e/0a/a6db5014ecbea5502aff79e3b9f3cd81.jpg',
        price: '60000',
        quantity: 3,
      },
      {
        id: 2,
        name: 'Tâm Lý Học Hành Vi ',
        book_image:
          'https://salt.tikicdn.com/cache/w1200/ts/product/50/bd/eb/51937df1d205a27deb93bde1dda06f05.jpg',
        price: '30000',
        quantity: 4,
      },
      {
        id: 3,
        name: 'Không Ai Có Thể Làm Bạn Tổn Thương Trừ Khi Bạn Cho Phép',
        book_image:
          'https://salt.tikicdn.com/cache/w1200/ts/product/0c/ff/1f/091c739d2cc4c1b2a3a9c5025930adcc.jpg',
        price: '50000',
        quantity: 3,
      },
    ],
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
            {/* <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 } }}> */}
            <OrderTable items={fakedata} />
            {/* </Paper> */}
          </Box>
        </Container>
      </ProductLayout>
    </>
  );
};
export default OrdersHistory;
