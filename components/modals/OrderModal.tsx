import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  useTheme,
  Alert,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import OrderDetailTable from '../orders/OrderDetailTable';
import dayjs from 'dayjs';
import { editOrderStatus } from '../../apis/order.api';
import { EOrderStatus } from '@/interfaces/compontents/order.interface';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import createRequest from '../../common/createRequest';
import { IModal } from '@/interfaces/compontents/modal.interface';
import { useQueryClient } from 'react-query';
import useGetOrderDetail from '../../hooks/order/useGetOrderDetail';
import statusMaping from '../../common/oderStatusMaping';

import { ORDERS, ORDERS_CLIENT } from '@/constants/queryKeyName';

const OrderModal: FC<IModal> = ({ handleClose, open, currentProduct }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const statusCash = [
    EOrderStatus.CANCELED,
    EOrderStatus.PENDING,
    EOrderStatus.SHIPPED,
    EOrderStatus.DELIVERED,
  ];
  const statusOnline = [
    EOrderStatus.CANCELED,
    EOrderStatus.PENDING,
    EOrderStatus.SHIPPED,
    EOrderStatus.PAID,
    EOrderStatus.DELIVERED,
  ];
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const order = currentProduct?.data;
  const {
    data: orderDetailData,
    isLoading,
    refetch,
  } = useGetOrderDetail(order?.orderId, !!order?.orderId);
  console.log(orderDetailData, '$test');
  const status = orderDetailData?.status
    ? orderDetailData?.status.EOrderStatus
    : null;
  const initialValues = {
    status,
    submit: null,
  };
  const [statusState, setStatusOrder] = useState<any>(orderDetailData?.status);
  const handleExit = (currentValues: any) => {
    if (objectEquals(initialValues, currentValues)) {
      handleClose();
    } else {
      setShowConfirm(true);
    }
  };
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  return open ? (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createRequest({
              status: values.status,
            });
            if (order !== null) {
              await editOrderStatus(orderDetailData?.id, req);
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${
                orderDetailData === null ? 'Tạo' : 'Cập nhật'
              } thành công`,
            });
            queryClient.refetchQueries([ORDERS]);
            queryClient.refetchQueries([ORDERS_CLIENT]);
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.log(`values. status: `, values.status);
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                order === null ? 'tạo' : 'cập nhật'
              } trạng thái đơn hàng`,
            });
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setValues,
        }) => (
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title={
              orderDetailData === null
                ? 'Đơn lỗi!'
                : `Thông tin chi tiết đơn hàng: #BOXO${order.orderId
                    .substr(-8)
                    .toUpperCase()}`
            }
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.status && errors.status)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-status">
                  Trạng thái đơn hàng
                </InputLabel>

                <Select
                  defaultValue={order.status}
                  id="select-status"
                  value={values.status}
                  label="Trạng thái đơn hàng"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setValues((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }));
                  }}
                >
                  {orderDetailData?.payment?.type === 'cash_on_delivery'
                    ? statusCash?.map(
                        (status: EOrderStatus, _index: number) =>
{
  const colors =  statusMaping(status).color;
                          return(
                              <MenuItem
                             key={_index}
                             value={status}
                           >
                               <Typography color={colors}>
                          {statusMaping(status).icon}
                            {'  '}
                            {statusMaping(status).content}
                        </Typography>
                           </MenuItem>


                          )}
                        )

                    : statusOnline?.map(
                        (status: EOrderStatus, _index: number) => { const colors =  statusMaping(status).color; return(

                          <MenuItem key={_index} value={status}>
                        <Typography color={colors}>
                          {statusMaping(status).icon}
                            {'  '}
                            {statusMaping(status).content}
                        </Typography>
                          </MenuItem>

                        )}
                      )}
                </Select>
                {touched.status && errors.status && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-publisherId"
                  >
                    {errors.status as any}
                  </FormHelperText>
                )}
              </FormControl>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Cập nhật trạng thái
                </Button>
                {!!showAlert && (
                  <Alert
                    sx={{ marginTop: 2 }}
                    severity={showAlert?.type.toString()}
                    color={
                      showAlert?.type.toString() === 'success'
                        ? 'info'
                        : showAlert?.type.toString()
                    }
                    onClose={() => setShowAlert(null)}
                  >
                    {showAlert?.content}
                  </Alert>
                )}
              </Box>
            </form>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography align="center" variant="h3" sx={{ mt: 2, mb: 2 }}>
                HÓA ĐƠN BÁN HÀNG
              </Typography>
              <Typography align="right" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                Ngày đặt hàng:{' '}
                {dayjs(currentProduct?.data?.date).format('DD/MM/YYYY')}
              </Typography>
              <Typography align="right" fontWeight="bold" sx={{ mb: 2 }}>
                Mã vận đơn: {orderDetailData?.shipping?.trackingNumber}{' '}
              </Typography>
              <OrderDetailTable data={orderDetailData} />
            </Box>
          </CustomModal>
        )}
      </Formik>

      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          handleClose();
        }}
      />
    </>
  ) : null;
};

export default OrderModal;
