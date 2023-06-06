import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  Alert,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { createGenre, editGenre } from '../../apis/genre.api';

import { editOrder } from '../../apis/order.api';

import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import createRequest from '../../common/createRequest';
import { IModal } from '@/interfaces/compontents/modal.interface';
import { useQueryClient } from 'react-query';
import useGetOrderDetail from '../../hooks/order/useGetOrderDetail';

import { ORDERS } from '@/constants/queryKeyName';

const OrderModal: FC<IModal> = ({ handleClose, open, currentProduct }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const order = currentProduct?.data;
  const { data: orderDetailData, isLoading, refetch } = useGetOrderDetail(order?.orderId, !!order?.orderId);
  console.log(orderDetailData, "$test");

  const initialValues = {
    orderId: order?.orderId ? order?.orderId : '',
    status: order?.status ? order?.status : '',
    submit: null,
  };
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
    {isLoading &&  <p>loading...</p>}
      {!isLoading && <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createRequest({
              status: values.status,
            });
            await editGenre(data?.orderId, req);
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: 'Cập nhật thành công',
            });
            queryClient.refetchQueries([ORDERS]);
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message:
                'Xảy ra lỗi trong quá trình cập nhật trạng thái đơn hàng',
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
        }) => (
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title="Chỉnh sửa trạng thái đơn hàng"
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                // error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên thể loại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.orderId}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên thể loại"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-name">
                    {errors.name as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.description && errors.description)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-description">
                  Mô tả thể loại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description"
                  type="text"
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.description && errors.description && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-description"
                  >
                    {errors.description as any}
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
                  Lưu
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
          </CustomModal>
        )}
      </Formik>}
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
