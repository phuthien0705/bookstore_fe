import { Grid, Typography } from '@mui/material';

const EmptyCart = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1" align="center">
                    Cart is empty
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">
                    Look like you have no items in your shopping cart.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default EmptyCart;
