import { useCallback } from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IItemTable } from '@/interfaces/compontents/cart.interface';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { moneyFormat } from '@/utils/moneyFormat';
import EmptyOrder from './EmptyOrder';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: 'auto',
});

const OrderTable: React.FunctionComponent<IItemTable> = ({
  items,
  addressMode = false,
}) => {
  const calcTotalBookPrice = useCallback((item: any) => {
    let total = 0;
    item?.order_details?.forEach((element: any) => {
      total += Number(element.price) * Number(element.quantity);
    });
    return total;
  }, []);

  if (!items && items?.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: '8px' }}>
        <EmptyOrder />
      </Box>
    );
  }
  return items.map((row: any) => (
    <TableContainer component={Paper} key={row.id} sx={{ mb: 2 }}>
      <Table sx={{ maxWidth: 1762, marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Stack display="flex" direction="row" alignItems="center">
                <LocalShippingIcon sx={{ color: 'black' }} />
                <Typography ml={addressMode ? 0 : 2} variant="h4">
                  Đã đặt hàng
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Typography textAlign="center">Số lượng</Typography>
            </TableCell>
            <TableCell colSpan={addressMode ? 1 : 2}>
              <Typography>Thành tiền</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(row?.order_details || []).map((item: any, _index: number) => (
            <TableRow key={`${item.id}_${_index}`}>
              <TableCell sx={{ maxWidth: '350px' }}>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Box>
                    <ImageStyle
                      alt={item?.book?.name}
                      width="76"
                      height="76"
                      src={item?.book?.book_image}
                    />
                  </Box>
                  <Box>
                    <Stack
                      sx={{
                        width: '100%',
                        height: '100%',
                        padding: '10px 0',
                      }}
                      direction="row"
                      justifyContent="space-between"
                      spacing={40}
                    >
                      <Typography fontSize="14px">
                        {item?.book?.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" textAlign="center">
                  {item.quantity}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" textAlign="left">
                  {moneyFormat(item.price * item.quantity || 0)} đ
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <Stack display="flex" direction="row" justifyContent="flex-start">
                <Typography>
                  Phí vận chuyển:{' '}
                  {moneyFormat(
                    (row?.payment?.total || 0) - (calcTotalBookPrice(row) || 0)
                  )}{' '}
                  đ
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <Stack display="flex" direction="row" justifyContent="flex-start">
                <Typography fontWeight={700} fontSize={'18px'} color={'black'}>
                  Tổng tiền: {moneyFormat(row?.payment?.total || 0)} đ
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ));
};

export default OrderTable;
