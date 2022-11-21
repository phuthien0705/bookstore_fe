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
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import AnimateButton from 'components/extended/AnimateButton';
import CustomModal from './CustomModal';
import objectEquals from 'common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { createGenre, editGenre } from 'apis/genre.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from 'store/snackbarReducer';
import createRequest from 'common/createRequest';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const ImageStyle = styled('img')({
    height: '100%',
    width: '100%',
    borderRadius: 4,
    objectFit: 'cover'
});
const BookModal = ({
    handleClose,
    open,
    currentProduct,
    refetchAfterClose,
    authors,
    genres,
    publishers,
    findAuthor,
    findGenre,
    findPublisher
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const data = currentProduct?.data;

    const initialValues = {
        name: data?.name ? data?.name : '',
        description: data?.description ? data?.description : '',
        available_quantity: data?.available_quantity ? data?.available_quantity : '',
        isbn: data?.isbn ? data?.isbn : '',
        language: 'vn',
        total_pages: data?.total_pages ? data?.total_pages : '',
        price: data?.price ? data?.price : '',
        book_image: data?.book_image ? data?.book_image : '',
        publish_date: data?.publish_date ? data?.publish_date : '',
        publisher_id: data?.publisher_id ? data?.publisher_id : '',
        genres: data?.genres ? data?.genres : [],
        authors: data?.authors ? data?.authors : [],

        submit: null
    };
    const handleExit = (currentValues) => {
        console.log(currentValues);
        if (objectEquals(initialValues, currentValues)) {
            handleClose();
        } else {
            setShowConfirm(true);
        }
    };
    const toast = ({ type, message }) => {
        dispatch(toggleSnackbar({ open: true, message, type }));
    };
    return open ? (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255, 'Tên sách tối đa 255 ký tự').required('Tên sách là bắt buộc'),
                    description: Yup.string().max(255, 'Mô tả sách tối đa 255 ký tự').required('Mô tả sách là bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const req = createRequest({ name: values.name, description: values.description });
                        if (data === null) {
                            await createGenre(req);
                        } else {
                            await editGenre(data?.id, req);
                        }
                        setStatus({ success: true });
                        setSubmitting(false);
                        toast({ type: 'success', message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công` });
                        refetchAfterClose();
                        setTimeout(() => {
                            handleClose();
                        }, 1000);
                    } catch (err) {
                        console.error(err);
                        toast({ type: 'error', message: `Xảy ra lỗi trong quá trình ${data === null ? 'tạo' : 'cập nhật'} thể loại` });
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <CustomModal
                        open={open}
                        handleClose={() => {
                            handleExit(values);
                        }}
                        title={data === null ? 'Tạo thể loại' : 'Chỉnh sửa thể loại'}
                    >
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-name">Tên sách</InputLabel>
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
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.description && errors.description)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-description">Mô tả sách</InputLabel>
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
                                    <FormHelperText error id="standard-weight-helper-text-description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.available_quantity && errors.available_quantity)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-available_quantity">Số lượng sách còn lại</InputLabel>
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
                                    <FormHelperText error id="standard-weight-helper-text-available_quantity">
                                        {errors.available_quantity}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth error={Boolean(touched.isbn && errors.isbn)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-isbn">Mã sách</InputLabel>
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
                                        {errors.isbn}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.total_pages && errors.total_pages)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-total_pages">Tổng số trang</InputLabel>
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
                                    <FormHelperText error id="standard-weight-helper-text-total_pages">
                                        {errors.total_pages}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-price">Giá {'(vnd)'}</InputLabel>
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
                                        {errors.price}
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
                                        position: 'relative',
                                        padding: '0.5rem 1rem',
                                        '&:hover': {
                                            border: '1px solid #000'
                                        }
                                    }}
                                >
                                    <Typography sx={{ color: '#9e9e9e' }}>Hình ảnh</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: values.book_image ? 'column' : 'row',
                                            justifyContent: 'space-between',
                                            columnGap: '0.5rem',
                                            rowGap: '0.5rem'
                                        }}
                                    >
                                        {values.book_image ? <ImageStyle src={values.book_image} /> : <div>Chưa có hình ảnh</div>}
                                        <IconButton
                                            sx={{
                                                width: 'fit-content',
                                                height: 'fit-content',
                                                padding: 0
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
                                                onChange={(e) => {
                                                    setValues((prev) => ({ ...prev, book_image: URL.createObjectURL(e.target.files[0]) }));
                                                }}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {touched.book_image && errors.book_image && (
                                    <FormHelperText error id="standard-weight-helper-text-book_image">
                                        {errors.book_image}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.publish_date && errors.publish_date)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-publish_date">Ngày phát hành</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-publish_date"
                                    type="text"
                                    value={values.publish_date}
                                    name="publish_date"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Mô tả thể loại"
                                    inputProps={{}}
                                />
                                {touched.publish_date && errors.publish_date && (
                                    <FormHelperText error id="standard-weight-helper-text-publish_date">
                                        {errors.publish_date}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.publisher_id && errors.publisher_id)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-publisher_id">ID tác giả</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-publisher_id"
                                    type="text"
                                    value={values.publisher_id}
                                    name="publisher_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Mô tả thể loại"
                                    inputProps={{}}
                                />
                                {touched.publisher_id && errors.publisher_id && (
                                    <FormHelperText error id="standard-weight-helper-text-publisher_id">
                                        {errors.publisher_id}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}

                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
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
                                </AnimateButton>
                                {!!showAlert && (
                                    <Alert
                                        sx={{ marginTop: 2 }}
                                        severity={showAlert?.type.toString()}
                                        color={showAlert?.type.toString() === 'success' ? 'info' : showAlert?.type.toString()}
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
BookModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    currentProduct: PropTypes.any,
    refetchAfterClose: PropTypes.func,
    authors: PropTypes.any,
    genres: PropTypes.any,
    publishers: PropTypes.any,
    findAuthor: PropTypes.func,
    findGenre: PropTypes.func,
    findPublisher: PropTypes.func
};
export default BookModal;
