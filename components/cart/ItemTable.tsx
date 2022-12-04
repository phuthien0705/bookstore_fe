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
}
const ItemTable: FC<IItemTable> = ({
  items,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1762 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Sản phẩm</Typography>
            </TableCell>
            {/* <TableCell>
              <Typography variant="h5">Giá</Typography>
            </TableCell> */}
            <TableCell>
              <Typography variant="h5">Số lượng</Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="h5">Thành tiền</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: any, _index: number) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack direction="row" justifyContent="flex-start" spacing={2}>
                  <Checkbox />
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
                      sx={{ height: '100%', padding: '10px 0' }}
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Typography fontSize="18px" fontWeight="500">
                        {row?.book?.name}
                      </Typography>
                      <Typography fontSize="14px" fontWeight="600">
                        {row?.price}
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
                <Typography fontSize="16px" fontWeight="bold">
                  {row.price * row?.quantity}
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
