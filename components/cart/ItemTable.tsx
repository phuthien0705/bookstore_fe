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
            <TableCell>
              <Typography variant="h5">Giá</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Số lượng</Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="h5">Tổng</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: any, index: number) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Box>
                    <ImageStyle
                      alt={row.name}
                      width="76"
                      height="76"
                      src={row?.book?.book_image}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">{row.name}</Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography fontSize="14px" fontWeight="semibold">
                  {row.price}
                </Typography>
              </TableCell>
              <TableCell>
                <QuantityButton
                  currentQuantity={row?.quantity}
                  handleIncreaseQuantity={() => handleIncreaseQuantity(row?.id)}
                  handleDecreaseQuantity={() => handleDecreaseQuantity(row?.id)}
                />
              </TableCell>
              <TableCell>
                <Typography fontSize="16px" fontWeight="bold">
                  {row.price * row?.quantity}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleDelete(row?.id)}
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
