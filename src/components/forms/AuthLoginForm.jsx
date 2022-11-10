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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import config from 'config';
import { login, reSendVerifyEmail } from 'apis/auth.api';
import authService from 'services/authService';
import { useNavigate } from 'react-router';
import checkIsAdminOrManager from 'common/checkIsAdminOrManager';

const AuthLoginForm = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(null);
    const googleHandler = async () => {
        console.error('Login');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Đăng nhập với google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${config.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            Hoặc
                        </Button>

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Đăng nhập bằng Email</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email phải đúng định dạng').max(255, 'Email tối đa 255 ký tự').required('Email là bắt buộc'),
                    password: Yup.string()
                        .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
                        .max(255, 'Mật khẩu tối đa 255 ký tự')
                        .required('Mật khẩu là bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const req = { email: values.email, password: values.password };
                        const res = await login(req);
                        console.log(res);
                        authService.login({
                            accessToken: res.access_token,
                            name: res.user.name,
                            id: res.user.id,
                            roles: res.roles,
                            email: res.user.email
                        });
                        if (!res.is_active) {
                            await reSendVerifyEmail({ email: values.email });
                            setShowAlert({
                                type: 'success',
                                content:
                                    'Tài khoản của bạn chưa được kích hoạt. Một Email đã được gửi, hãy kiểm tra Email để kích hoạt tài khoản.'
                            });
                            // authService.logOut();
                            setStatus({ success: true });
                            setSubmitting(false);
                            return;
                        }
                        setStatus({ success: true });
                        setSubmitting(false);
                        if (!checkIsAdminOrManager(res?.roles)) {
                            navigate('/');
                        } else {
                            navigate('../admin/product');
                        }
                    } catch (err) {
                        console.error(err);
                        setShowAlert({ type: 'error', content: 'Xảy ra lỗi trong quá trình đăng nhập' });
                        setStatus({ success: false });

                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
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

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
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
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Ghi nhớ đăng nhập"
                            />
                            <Typography
                                onClick={() => navigate('../forgot-password')}
                                variant="subtitle1"
                                color="secondary"
                                sx={{ textDecoration: 'none', cursor: 'pointer' }}
                            >
                                Quên mật khẩu
                            </Typography>
                        </Stack>
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
                                    Đăng nhập
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
        </>
    );
};

export default AuthLoginForm;
