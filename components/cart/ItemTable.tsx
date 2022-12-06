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
import { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { addCheckedItem } from '@/apis/cart.api';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { useMutation, useQueryClient } from 'react-query';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: 'auto',
});
interface IItemTable {
  items: any;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
  handleDelete: Function;
  checkItem: Function;
  checkAllItem: Function;
  clearCart: Function;
}
const ItemTable: FC<IItemTable> = ({
  items,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleDelete,
  checkItem,
  checkAllItem,
  clearCart,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1762, marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">
                <Checkbox
                  sx={{ height: 'fit-content' }}
                  checked={
                    items?.every((item: any) => item?.is_checked == true) ||
                    false
                  }
                  onChange={() => {
                    checkAllItem({
                      is_checked: !items?.every(
                        (item: any) => item?.is_checked == true
                      ),
                    });
                  }}
                />{' '}
                Chọn tất cả ({items?.length || 0} sản phẩm){' '}
                <Typography
                  onClick={() => clearCart()}
                  component={'span'}
                  sx={{
                    color: 'red',
                    cursor: 'pointer',
                    display: items?.every(
                      (item: any) => item?.is_checked == true
                    )
                      ? 'inline-block'
                      : 'none',
                  }}
                >
                  (Xóa)
                </Typography>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography textAlign="center" variant="h5">
                Số lượng
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography ml={2} variant="h5">
                Thành tiền
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell sx={{ maxWidth: '350px' }}>
                <Stack direction="row" justifyContent="flex-start" spacing={2}>
                  <Checkbox
                    sx={{ height: 'fit-content' }}
                    checked={row?.is_checked || false}
                    onChange={() => {
                      checkItem({
                        book_id: row?.book?.id,
                        is_checked: !row?.is_checked,
                      });
                    }}
                  />
                  <Box>
                    <ImageStyle
                      alt={row?.book?.name}
                      width="76"
                      height="76"
                      src={row?.book?.book_image}
                    />
                  </Box>
                  <Box>
                    <Stack
                      sx={{ width: '100%', height: '100%', padding: '10px 0' }}
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Typography fontSize="16px" fontWeight="500">
                        {row?.book?.name}
                      </Typography>
                      <Typography fontSize="14px" fontWeight="600">
                        {row?.price}đ
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </TableCell>

              <TableCell sx={{ maxWidth: 100, minWidth: 100 }}>
                <QuantityButton
                  currentQuantity={row?.quantity}
                  handleIncreaseQuantity={() =>
                    handleIncreaseQuantity(row?.book_id)
                  }
                  handleDecreaseQuantity={() =>
                    handleDecreaseQuantity(row?.book_id)
                  }
                />
              </TableCell>
              <TableCell>
                <Typography
                  fontSize="16px"
                  fontWeight="bold"
                  textAlign={'center'}
                >
                  {row.price * row?.quantity}đ
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 40, minWidth: 40 }}>
                <IconButton
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleDelete(row?.book_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
