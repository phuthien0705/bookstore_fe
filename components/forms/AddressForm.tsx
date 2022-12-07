import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import useGetListAddress from '@/hooks/client/useGetListAddress';

const AddressForm = ({ currentAddress, setEditMode }: any) => {
  const { data: listCity } = useGetListAddress();
  const dispatch = useDispatch();
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  const theme: any = useTheme();
  const data = currentAddress?.data;

  const initialValues = {
    name: data?.name ? data?.name : '',
    description: data?.description ? data?.description : '',
    phone: data?.phone ? data?.phone : '',
    city_id: data?.city_id ? data?.city_id : '',
    submit: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255, 'Họ và tên tối đa 255 ký tự')
          .required('Họ và tên là bắt buộc'),
        description: Yup.string().required('Địa chỉ cụ thể là bắt buộc'),
        phone: Yup.number()
          .required('Số điện thoại là bắt buộc')
          .integer('Số điện thoại phải là số nguyên')
          .typeError('Số điện thoại phải là số nguyên'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          //   const req = createRequest({
          //     name: values.name,
          //     description: values.description,
          //   });
          //   if (data === null) {
          //     await createGenre(req);
          //   } else {
          //     await editGenre(data?.id, req);
          //   }
          setStatus({ success: true });
          setSubmitting(false);
          toast({
            type: 'success',
            message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
          });

          setTimeout(() => {
            setEditMode(false);
          }, 1000);
        } catch (err) {
          console.error(err);
          toast({
            type: 'error',
            message: `Xảy ra lỗi trong quá trình ${
              data === null ? 'tạo' : 'cập nhật'
            } địa chỉ`,
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
        <form noValidate onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            error={Boolean(touched.name && errors.name)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-name">Họ và tên</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              type="text"
              value={values.name}
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
            error={Boolean(touched.phone && errors.phone)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-phone">
              Số điện thoại
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-phone"
              type="text"
              value={values.phone}
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Mô tả thể loại"
              inputProps={{}}
            />
            {touched.phone && errors.phone && (
              <FormHelperText error id="standard-weight-helper-text-phone">
                {errors.phone as any}
              </FormHelperText>
            )}
          </FormControl>
          {/* <FormControl
            fullWidth
            error={Boolean(touched.city_id && errors.city_id)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="select-city_id">Tác giả</InputLabel>

            <Select
              id="select-city_id"
              value={values.city_id}
              label="Tác giả"
              onChange={(event) => {
                setValues((prev) => ({
                  ...prev,
                  city_id: event.target.value,
                }));
              }}
            >
              {/* render list author */}
          {/* {city_id?.map((author, _index) => (
                <MenuItem key={_index} value={author?.id}>
                  {author?.name}
                </MenuItem>
              ))}
            </Select>
            {touched.city_id && errors.city_id && (
              <FormHelperText error id="standard-weight-helper-text-city_id">
                {errors.city_id as any}
              </FormHelperText>
            )}
          </FormControl> */}
          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-description">
              Địa chỉ cụ thể
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

          <Stack
            direction="row"
            justifyContent={'flex-end'}
            spacing={1}
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              size="large"
              disableElevation
              onClick={() => setEditMode(false)}
              sx={{ width: 'fit-content' }}
            >
              Trở lại
            </Button>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: 'fit-content' }}
            >
              {!data ? 'Tạo' : 'Lưu'}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
