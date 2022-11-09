import { Grid, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const CartTitle = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={1}>
                <Typography variant="h3">Checkout</Typography>
            </Grid>
            <Grid item xs={1}>
                <Breadcrumbs separator={<NavigateNext />} aria-label="breadcrumb">
                    <Link color="text.primary" href="/">
                        Home
                    </Link>
                    <Typography color="inherit">Checkout</Typography>
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
};

export default CartTitle;
