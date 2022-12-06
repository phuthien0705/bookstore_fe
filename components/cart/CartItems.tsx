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
import { useMutation, useQueryClient } from 'react-query';
import {
  addAllCheckedItem,
  addCheckedItem,
  clearCart,
  removeFormCart,
  updateCart,
} from '@/apis/cart.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';

const CartItems: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState<any>(null);
  const [showConfirmClearCart, setShowConfirmClearCart] =
    useState<boolean>(false);
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

  const { mutate: checkItemFunc, isLoading } = useMutation(
    ({ book_id, is_checked }: { book_id: number; is_checked: boolean }) =>
      addCheckedItem({ book_id, is_checked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Máy chủ đang bận xin vui lòng thử lại sau',
        });
      },
    }
  );
  const { mutate: checkAllItemFunc } = useMutation(
    ({ is_checked }: { is_checked: boolean }) =>
      addAllCheckedItem({ is_checked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Máy chủ đang bận xin vui lòng thử lại sau',
        });
      },
    }
  );
  const { mutate: clearCartFunc } = useMutation(clearCart, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Máy chủ đang bận xin vui lòng thử lại sau',
      });
    },
  });
  const handleChange = (event: any, newValue: any) => {
    setCurrentIndex(newValue);
  };
  const handleIncreaseQuantity = useCallback(
    (book_id: number) => {
      data?.forEach((item: any) => {
        if (item?.book_id === book_id) {
          updateCartFunc({ book_id: book_id, quantity: item.quantity + 1 });
        }
      });
    },
    [data, updateCartFunc]
  );
  const handleDecreaseQuantity = useCallback(
    (book_id: number) => {
      const decreaseItem = data.find((item: any) => item.book_id === book_id);
      if (decreaseItem?.quantity === 1) {
        setShowConfirmModal(decreaseItem && decreaseItem?.book_id);
      } else {
        data.forEach((item: any) => {
          if (item?.book_id === book_id) {
            updateCartFunc({ book_id: book_id, quantity: item.quantity - 1 });
          }
        });
      }
    },
    [data, updateCartFunc]
  );
  const handleDelete = useCallback(
    (book_id: number) => {
      removeFunc({ book_id: book_id });
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
              {matches ? (
                <ItemTable
                  items={data || []}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleDelete={handleDelete}
                  checkItem={checkItemFunc}
                  checkAllItem={checkAllItemFunc}
                  clearCart={() => setShowConfirmClearCart(true)}
                />
              ) : (
                <ItemTableMobile
                  items={data || []}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleDelete={handleDelete}
                  checkItem={checkItemFunc}
                  checkAllItem={checkAllItemFunc}
                  clearCart={() => setShowConfirmClearCart(true)}
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
      <ConfirmModal
        open={showConfirmClearCart}
        contentHeader="Xóa tất cả sản phẩm"
        textContent="Bạn có muốn xóa tất cả sản phẩm đang chọn?"
        confirmContent="Xác nhận"
        cancelContent="Hủy"
        handleClose={() => setShowConfirmClearCart(false)}
        handleConfirm={() => {
          clearCartFunc();
          setShowConfirmClearCart(false);
        }}
      />
    </>
  );
};

export default CartItems;
