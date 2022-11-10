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
    Button
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

const GenreModal = ({ handleClose, open, currentProduct }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const data = currentProduct?.data;
    console.log(data);

    const initialValues = {
        name: data?.name ? data?.name : '',
        description: data?.description ? data?.description : '',
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
        console.log({ type, message });
        dispatch(toggleSnackbar({ open: true, message, type }));
    };
    return open ? (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255, 'Tên thể loại tối đa 255 ký tự').required('Tên thể loại là bắt buộc'),
                    description: Yup.string().max(255, 'Mô tả thể loại tối đa 255 ký tự')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const req = { name: values.name, description: values.description };
                        if (data === null) {
                            await createGenre(data);
                        } else {
                            await editGenre(data?.id, req);
                        }
                        setStatus({ success: true });
                        setSubmitting(false);
                        // setShowAlert({ type: 'success', content: `${'Cập nhật'} thành công` });
                        toast({ type: 'success', message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công` });
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <CustomModal
                        open={open}
                        handleClose={() => {
                            handleExit(values);
                        }}
                        title={data === null ? 'Tạo thể loại' : 'Chỉnh sửa thể loại'}
                    >
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-name-login">Tên thể loại</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name-login"
                                    type="text"
                                    value={values.name}
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Tên thể loại"
                                    inputProps={{}}
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="standard-weight-helper-text-name-login">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.description && errors.description)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-description-login">Mô tả thể loại</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-description-login"
                                    type="text"
                                    value={values.description}
                                    name="description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Mô tả thể loại"
                                    inputProps={{}}
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="standard-weight-helper-text-description-login">
                                        {errors.description}
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
GenreModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    currentProduct: PropTypes.any
};
export default GenreModal;
