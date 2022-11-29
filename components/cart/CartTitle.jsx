import { Grid, Typography, Breadcrumbs, Link, Stack, Box } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const CartTitle = () => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Box>
                <Typography variant="h3">Giỏ hàng</Typography>
            </Box>
            <Box mt={{ xs: 1, sm: 0 }}>
                <Breadcrumbs separator={<NavigateNext />} aria-label="breadcrumb">
                    <Link color="text.primary" href="/">
                        Trang chủ
                    </Link>
                    <Typography color="inherit">Giỏ hàng</Typography>
                </Breadcrumbs>
            </Box>
        </Stack>
    );
};

export default CartTitle;
