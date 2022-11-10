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
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import AnimateButton from 'components/extended/AnimateButton';
import CustomModal from './CustomModal';

const ProductAdminModal = ({ handleClose, open }) => {
    const [showAlert, setShowAlert] = useState(false);
    const theme = useTheme();

    return (
        <CustomModal open={open} handleClose={handleClose} title={'Chỉnh sửa'} submitContent={'Lưu'}>
            <Formik
                initialValues={{
                    email: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email phải đúng định dạng').max(255, 'Email tối đa 255 ký tự').required('Email là bắt buộc')
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
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
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
                                    Lưu
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
ProductAdminModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};
export default ProductAdminModal;
