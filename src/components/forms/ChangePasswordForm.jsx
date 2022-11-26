import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import config from 'config';
import { changePassword, login } from 'apis/auth.api';
import authService from 'services/authService';
import { useNavigate } from 'react-router';

const ChangePasswordForm = ({ params, ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showAlert, setShowAlert] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((i) => !i);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPasswordConfirmation = () => {
        setShowPasswordConfirmation((i) => !i);
    };
    return (
        <>
            <Formik
                initialValues={{
                    password: '',
                    new_password: '',
                    password_confirmation: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().required('Mật khẩu là bắt buộc'),
                    new_password: Yup.string()
                        .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
                        .max(255, 'Mật khẩu tối đa 255 ký tự')
                        .required('Mật khẩu là bắt buộc'),
                    password_confirmation: Yup.string().required('Nhập lại mật khẩu là bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    if (values.new_password !== values.password_confirmation) {
                        setShowAlert({ type: 'error', content: 'Mật khẩu và mật khẩu nhập lại phải trùng nhau.' });
                        setStatus({ success: true });
                        setSubmitting(false);
                        return;
                    }
                    try {
                        const req = { password: values.password, password_confirmation: values.password_confirmation };
                        const res = await changePassword(params, req);
                        setShowAlert({
                            type: 'success',
                            content: 'Đổi mật khẩu thành công.'
                        });
                        setStatus({ success: true });
                        setSubmitting(false);
                        setTimeout(() => {
                            navigate('../login');
                        }, 3000);
                    } catch (err) {
                        console.error(err);
                        setShowAlert({
                            type: 'error',
                            content: 'Xảy ra lỗi trong quá trình đổi mật khẩu.'
                        });
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Nhập mật khẩu hiện tại</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-newpassword">Mật khẩu mới</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-newpassword"
                                type={showPassword ? 'text' : 'password'}
                                value={values.new_password}
                                name="new_password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                                inputProps={{}}
                            />
                            {touched.new_password && errors.new_password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.new_password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password_confirmation-login">Nhập lại mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password_confirmation-login"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                value={values.password_confirmation}
                                name="password_confirmation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirmation}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Nhập lại mật khẩu"
                                inputProps={{}}
                            />
                            {touched.password_confirmation && errors.password_confirmation && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password_confirmation}
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
                                    color="secondary"
                                >
                                    Đổi mật khẩu
                                </Button>
                            </AnimateButton>
                            {!!showAlert && (
                                <Alert
                                    sx={{ marginTop: 2 }}
                                    severity={showAlert?.type.toString()}
                                    color={showAlert?.type.toString() === 'success' ? 'info' : 'error'}
                                    onClose={() => setShowAlert(null)}
                                >
                                    {showAlert?.content}
                                </Alert>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ChangePasswordForm;
