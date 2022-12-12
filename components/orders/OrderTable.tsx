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
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import QuantityButton from '../extended/Quantity';
import Checkbox from '@mui/material/Checkbox';
import { IItemTable } from '@/interfaces/compontents/cart.interface';

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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1762, marginTop: addressMode ? 0 : 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography ml={addressMode ? 0 : 2} variant="h5">
                Sản phẩm
              </Typography>
            </TableCell>
            <TableCell colSpan={addressMode ? 1 : 2}>
              <Typography variant="h5">Thành tiền</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell sx={{ maxWidth: '350px' }}>
                <Stack direction="row" justifyContent="flex-start" spacing={2}>
                  <Box>
                    <ImageStyle
                      alt={row.name}
                      width="76"
                      height="76"
                      src={row.book_image}
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
                        {row.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography fontSize="16px" fontWeight="bold" textAlign="left">
                  {row.price * row?.quantity}đ
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
  );
};

export default OrderTable;
