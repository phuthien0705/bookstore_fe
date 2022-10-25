import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthWrapper from 'components/auth/AuthWrapper';
import AuthLoginForm from 'components/forms/AuthLoginForm';
import AuthCardWrapper from 'components/auth/AuthCardWrapper';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
import AuthFooter from 'components/cards/AuthFooter';

const LoginPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Đăng nhập
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Nhập thông tin đăng nhập để tiếp tục
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLoginForm />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Bạn chưa có tài khoản? Đi đến đăng ký.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default LoginPage;
