import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  useTheme,
  Alert,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState, FC } from 'react';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { createGenre, editGenre } from '../../apis/genre.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import createRequest from '../../common/createRequest';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import createFormDataRequest from '../../common/createFormDataRequest';
import { createBook, editBook } from '../../apis/product.api';

const ImageStyle = styled('img')({
  height: '100%',
  width: '100%',
  borderRadius: 4,
  objectFit: 'cover',
});
interface IBookModal {
  handleClose: Function;
  open: boolean;
  currentProduct: any;
  refetchAfterClose: Function;
  authors: any[];
  genres: any[];
  publishers: any[];
  findAuthor: Function;
  findGenre: Function;
  findPublisher: Function;
}

const BookModal: FC<IBookModal> = ({
  handleClose,
  open,
  currentProduct,
  refetchAfterClose,
  authors,
  genres,
  publishers,
  findAuthor,
  findGenre,
  findPublisher,
}) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState<any>(false);
  const [image, setImage] = useState(null);

  const data = currentProduct?.data;

  const initialValues = {
    name: data?.name ? data?.name : '',
    description: data?.description ? data?.description : '',
    available_quantity: data?.available_quantity
      ? data?.available_quantity
      : '',
    isbn: data?.isbn ? data?.isbn : '',
    language: 'vn',
    total_pages: data?.total_pages ? data?.total_pages : '',
    price: data?.price ? data?.price : '',
    book_image: data?.book_image ? data?.book_image : '',
    published_date: data?.published_date ? data?.published_date : '',
    publisher_id: data?.publisher_id ? data?.publisher_id : '',
    genres: data?.genres ? data?.genres : [],
    authors: data?.authors ? data?.authors : [],
    submit: null,
  };
  const handleExit = (currentValues: any) => {
    console.log(currentValues);
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
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255, 'Tên sách tối đa 255 ký tự')
            .required('Tên sách là bắt buộc'),
          description: Yup.string().max(255, 'Mô tả sách tối đa 255 ký tự'),
          available_quantity: Yup.number()
            .integer('Số lượng sách phải là số nguyên')
            .typeError('Số lượng sách phải là số nguyên'),
          isbn: Yup.string().max(20, 'Mã sách tối đa 20 ký tự'),
          total_pages: Yup.number()
            .integer('Số trang phải là số nguyên')
            .typeError('Số trang phải là số nguyên'),
          price: Yup.number().typeError('Giá sản phẩm phải là số'),
          book_image: Yup.string().required('Hình ảnh là bắt buộc'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createFormDataRequest({
              name: values.name,
              description: values.description,
              available_quantity: values.available_quantity,
              isbn: values.isbn,
              language: values.language,
              total_pages: values.total_pages,
              price: values.price,
              book_image: image,
              published_date: values.published_date,
              publisher_id: values.publisher_id,
              genres: values.genres,
              authors: values.authors,
            });
            console.log({
              name: values.name,
              description: values.description,
              available_quantity: values.available_quantity,
              isbn: values.isbn,
              language: values.language,
              total_pages: values.total_pages,
              price: values.price,
              book_image: image,
              published_date: values.published_date,
              publisher_id: values.publisher_id,
              genres: values.genres,
              authors: values.authors,
            });
            if (data === null) {
              await createBook(req);
            } else {
              await editBook(data?.id, req);
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            refetchAfterClose();
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } sản phẩm`,
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
            title={data === null ? 'Tạo thể loại' : 'Chỉnh sửa thể loại'}
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên sách
                </InputLabel>
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
                error={Boolean(touched.description && errors.description)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-description">
                  Mô tả sách
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
              <FormControl
                fullWidth
                error={Boolean(
                  touched.available_quantity && errors.available_quantity
                )}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-available_quantity">
                  Số lượng sách còn lại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-available_quantity"
                  type="text"
                  value={values.available_quantity}
                  name="available_quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.available_quantity && errors.available_quantity && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-available_quantity"
                  >
                    {errors.available_quantity as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.isbn && errors.isbn)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-isbn">
                  Mã sách
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-isbn"
                  type="text"
                  value={values.isbn}
                  name="isbn"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.isbn && errors.isbn && (
                  <FormHelperText error id="standard-weight-helper-text-isbn">
                    {errors.isbn as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.total_pages && errors.total_pages)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-total_pages">
                  Tổng số trang
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-total_pages"
                  type="text"
                  value={values.total_pages}
                  name="total_pages"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.total_pages && errors.total_pages && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-total_pages"
                  >
                    {errors.total_pages as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.price && errors.price)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-price">
                  Giá {'(vnd)'}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  type="text"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.price && errors.price && (
                  <FormHelperText error id="standard-weight-helper-text-price">
                    {errors.price as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.book_image && errors.book_image)}
                sx={{ ...theme.typography.customInput }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: '#fafafa',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '8px',

                    padding: '0.5rem 1rem',
                    '&:hover': {
                      border: '1px solid #000',
                    },
                  }}
                >
                  <Typography sx={{ color: '#9e9e9e' }}>Hình ảnh</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: values.book_image ? 'column' : 'row',
                      justifyContent: 'space-between',
                      columnGap: '0.5rem',
                      rowGap: '0.5rem',
                    }}
                  >
                    {values.book_image ? (
                      <ImageStyle src={values.book_image} />
                    ) : (
                      <div>Chưa có hình ảnh</div>
                    )}
                    <IconButton
                      sx={{
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: 0,
                      }}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        id="outlined-adornment-book_image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e: any) => {
                          setImage(e.target.files[0]);
                          setValues((prev) => ({
                            ...prev,
                            book_image: URL.createObjectURL(e.target.files[0]),
                          }));
                        }}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                </Box>
                {touched.book_image && errors.book_image && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-book_image"
                  >
                    {errors.book_image as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.published_date && errors.published_date)}
                sx={{ ...theme.typography.customInput }}
              >
                <Typography
                  sx={{
                    color: '#9e9e9e',
                    position: 'absolute',
                    top: '10px',
                    left: '16px',
                    zIndex: 10,
                  }}
                >
                  Ngày phát hành
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-published_date"
                  type="date"
                  value={values.published_date}
                  name="published_date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Ngày phát hành"
                  inputProps={{}}
                />
                {touched.published_date && errors.published_date && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-published_date"
                  >
                    {errors.published_date as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.publisher_id && errors.publisher_id)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-publisher_id">
                  Nhà xuất bản
                </InputLabel>

                <Select
                  id="select-publisher_id"
                  value={values.publisher_id}
                  label="Nhà xuất bản"
                  onChange={(event) => {
                    setValues((prev) => ({
                      ...prev,
                      publisher_id: event.target.value,
                    }));
                  }}
                >
                  {/* render list publisher */}
                  {publishers?.map((publisher: any, _index: number) => (
                    <MenuItem key={_index} value={publisher?.id}>
                      {publisher?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.publisher_id && errors.publisher_id && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-publisher_id"
                  >
                    {errors.publisher_id as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.genres && errors.genres)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-genres">Thể loại</InputLabel>

                <Select
                  multiple
                  id="select-genres"
                  value={values.genres}
                  label="Thể loại"
                  onChange={(event) => {
                    setValues((prev) => ({
                      ...prev,
                      genres: event.target.value,
                    }));
                  }}
                >
                  {/* render list genre */}
                  {genres?.map((genre: any, _index: number) => (
                    <MenuItem key={_index} value={genre?.id}>
                      {genre?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.genres && errors.genres && (
                  <FormHelperText error id="standard-weight-helper-text-genres">
                    {errors.genres as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.authors && errors.authors)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-authors">Tác giả</InputLabel>

                <Select
                  multiple
                  id="select-authors"
                  value={values.authors}
                  label="Tác giả"
                  onChange={(event) => {
                    setValues((prev) => ({
                      ...prev,
                      authors: event.target.value,
                    }));
                  }}
                >
                  {/* render list author */}
                  {authors?.map((author, _index) => (
                    <MenuItem key={_index} value={author?.id}>
                      {author?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.authors && errors.authors && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-authors"
                  >
                    {errors.authors as any}
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
                  {data === null ? 'Tạo' : 'Lưu'}
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

export default BookModal;
