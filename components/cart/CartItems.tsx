import { Grid, Tabs, Tab } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentIcon from '@mui/icons-material/Payment';
import ProductAdded from './ProductAdded';
import ItemTable from './ItemTable';
import OrderSummary from './OrderSummary';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemTableMobile from './ItemTableMobile';
import ConfirmModal from '../modals/ConfirmModal';
import useGetListCart from '@/hooks/client/useGetListCart';
import { useMutation } from 'react-query';
import { removeFormCart, updateCart } from '@/apis/cart.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';

const CartItems = () => {
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const matches = useMediaQuery('(min-width:900px)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState<any>(null);
  const { data, isloading, isFetching, refetch } = useGetListCart();
  const { mutate: updateCartFunc, isLoading: isUpdating } = useMutation(
    (data: { book_id: number; quantity: number }) => updateCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật sản phẩm',
        });
      },
    }
  );
  const { mutate: removeFunc, isLoading: isRemoving } = useMutation(
    (data: { book_id: number }) => removeFormCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật sản phẩm',
        });
      },
    }
  );
  const handleChange = (event: any, newValue: any) => {
    setCurrentIndex(newValue);
  };
  const handleIncreaseQuantity = useCallback(
    (id: number) => {
      data?.forEach((item: any) => {
        if (item?.id === id) {
          updateCartFunc({ book_id: id, quantity: item.quantity + 1 });
        }
      });
    },
    [data, updateCartFunc]
  );
  const handleDecreaseQuantity = useCallback(
    (id: number) => {
      const decreaseItem = data.find((item: any) => item.id === id);
      if (decreaseItem?.quantity === 1) {
        setShowConfirmModal(decreaseItem && decreaseItem?.id);
      } else {
        data.forEach((item: any) => {
          if (item?.id === id) {
            updateCartFunc({ book_id: id, quantity: item.quantity - 1 });
          }
        });
      }
    },
    [data, updateCartFunc]
  );
  const handleDelete = useCallback(
    (id: number) => {
      removeFunc({ book_id: id });
    },
    [removeFunc]
  );
  console.log(data);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={currentIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
          >
            <Tab
              icon={<ShoppingCartIcon />}
              label="Giỏ"
              disabled={currentIndex !== 0}
            />
            <Tab
              icon={<ApartmentIcon />}
              label="Thông tin địa chỉ"
              disabled={currentIndex !== 1}
            />
            <Tab
              icon={<PaymentIcon />}
              label="Thanh toán"
              disabled={currentIndex !== 2}
            />
          </Tabs>
        </Grid>
        {data && data?.length > 0 && (
          <>
            <Grid item xs={12}>
              <ProductAdded amount={data?.length || 0} />
            </Grid>
            <Grid item xs={12}>
              {matches ? (
                <ItemTable
                  items={data || []}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleDelete={handleDelete}
                />
              ) : (
                <ItemTableMobile
                  items={data || []}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleDelete={handleDelete}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <OrderSummary items={data} />
            </Grid>
            <Grid item xs={12}>
              <SubmitCart setCurrentIndex={setCurrentIndex} />
            </Grid>
          </>
        )}

        {data && data?.length === 0 && (
          <Grid item xs={12} sx={{ p: 30 }}>
            <EmptyCart />
          </Grid>
        )}
      </Grid>
      <ConfirmModal
        open={showConfirmModal !== null}
        contentHeader="Xóa sản phẩm"
        textContent="Bạn có muốn xóa sản phẩm đang chọn?"
        confirmContent="Xác nhận"
        cancelContent="Hủy"
        handleClose={() => setShowConfirmModal(null)}
        handleConfirm={() => {
          handleDelete(showConfirmModal);
          setShowConfirmModal(null);
        }}
      />
    </>
  );
};

export default CartItems;
