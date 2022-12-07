import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityButton from '../extended/Quantity';
import { FC } from 'react';
import { IItemTableMobile } from '@/interfaces/compontents/cart.interface';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: '100px',
});

const ItemTableMobile: FC<IItemTableMobile> = ({
  items,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleDelete,
  checkItem,
  checkAllItem,
  clearCart,
}) => {
  return (
    <Paper sx={{ margin: '16px 16px 16px 0' }}>
      {' '}
      <Typography variant="h5">
        <Checkbox
          sx={{ height: 'fit-content' }}
          checked={
            items?.every((item: any) => item?.is_checked == true) || false
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
            display: items?.every((item: any) => item?.is_checked == true)
              ? 'inline-block'
              : 'none',
          }}
        >
          (Xóa)
        </Typography>
      </Typography>
      {items.map((item: any, _index: number) => (
        <Stack
          key={_index}
          direction="row"
          alignItems={'flex-end'}
          justifyContent="space-between"
          mt={2}
          mb={2}
        >
          <Stack direction="row" alignItems={'center'}>
            <Checkbox
              sx={{ height: 'fit-content' }}
              checked={item?.is_checked || false}
              onChange={() => {
                checkItem({
                  book_id: item?.book?.id,
                  is_checked: !item?.is_checked,
                });
              }}
            />
            <ImageStyle alt={item?.book?.name} src={item?.book?.book_image} />

            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography fontSize="16px">{item?.book?.name}</Typography>
              <Stack direction="column" spacing={1}>
                <Typography fontSize="14px" fontWeight="bold" color="#ee4d2d">
                  {item.price} đ
                </Typography>
                <QuantityButton
                  currentQuantity={item?.quantity}
                  handleIncreaseQuantity={() =>
                    handleIncreaseQuantity(item?.book_id)
                  }
                  handleDecreaseQuantity={() =>
                    handleDecreaseQuantity(item?.book_id)
                  }
                />
              </Stack>
            </Stack>
          </Stack>
          <IconButton
            sx={{ padding: '0 0 2px 0' }}
            size="small"
            disableFocusRipple
            disableRipple
            onClick={() => handleDelete(item?.book_id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
    </Paper>
  );
};

export default ItemTableMobile;
