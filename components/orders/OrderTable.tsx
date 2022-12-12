import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Card,
} from '@mui/material';
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import QuantityButton from '../extended/Quantity';
import Checkbox from '@mui/material/Checkbox';
import { IItemTable } from '@/interfaces/compontents/cart.interface';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
  return items.map((row: any) => (
    <TableContainer component={Paper} key={row.id} sx={{ mb: 2 }}>
      <Table sx={{ maxWidth: 1762, marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Stack display="flex" direction="row" alignItems="center">
                <LocalShippingIcon sx={{ color: 'black' }} />
                <Typography ml={addressMode ? 0 : 2} variant="h4">
                  Giao thành công
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="center">
                Số lượng
              </Typography>
            </TableCell>
            <TableCell colSpan={addressMode ? 1 : 2}>
              <Typography variant="h5">Thành tiền</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.product.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell sx={{ maxWidth: '350px' }}>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Box>
                    <ImageStyle
                      alt={item.name}
                      width="76"
                      height="76"
                      src={item.book_image}
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
                      <Typography fontSize="16px" fontWeight="500">
                        {item.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography
                  fontSize="16px"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {item.quantity}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize="16px" fontWeight="bold" textAlign="left">
                  {item.price * item.quantity}đ
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={2}>
              <Stack display="flex" direction="row" justifyContent="flex-end">
                <Typography variant="h3">Tổng tiền: </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ));
};

export default OrderTable;
