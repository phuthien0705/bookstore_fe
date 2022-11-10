import {
    Box,
    Dialog,
    DialogTitle,
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
import CustomModal from './CustomModal';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import AnimateButton from 'components/extended/AnimateButton';

const GenreModal = ({ handleClose, open, currentProduct }) => {
    const [showAlert, setShowAlert] = useState(false);
    const theme = useTheme();
    const data = currentProduct?.data;
    console.log(data);
    const initialValues = {
        name: data?.name ? data?.name : '',
        description: data?.description ? data?.description : '',
        submit: null
    };

    return (
        <CustomModal open={open} handleClose={handleClose} title={data === null ? 'Tạo thể loại' : 'Chỉnh sửa thể loại'}>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255, 'Tên thể loại tối đa 255 ký tự').required('Tên thể loại là bắt buộc'),
                    description: Yup.string().max(255, 'Mô tả thể loại tối đa 255 ký tự').required('Mô tả thể loại là bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // const req = { email: values.email, password: values.password };
                        // const res = await login(req);
                        // console.log(res);
                        // authService.login({ accessToken: res.access_token, name: res.user.name, id: res.user.id, role: res.user?.role });
                        // if (!res.is_active) {
                        //     await reSendVerifyEmail({ email: values.email });
                        //     setShowAlert({
                        //         type: 'success',
                        //         content:
                        //             'Tài khoản của bạn chưa được kích hoạt. Một Email đã được gửi, hãy kiểm tra Email để kích hoạt tài khoản.'
                        //     });
                        //     // authService.logOut();
                        //     setStatus({ success: true });
                        //     setSubmitting(false);
                        //     return;
                        // }
                        // setStatus({ success: true });
                        // setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setShowAlert({ type: 'error', content: 'Xảy ra lỗi trong quá trình đăng nhập' });
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
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
                )}
            </Formik>
        </CustomModal>
    );
};
GenreModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    currentProduct: PropTypes.any
};
export default GenreModal;
