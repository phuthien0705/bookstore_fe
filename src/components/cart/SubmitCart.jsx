import { Grid, ButtonBase, IconButton, Stack, Paper, InputBase, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const SubmitCart = () => {
    return (
        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={8}>
                <ButtonBase sx={{ display: 'flex' }}>
                    <IconButton disableRipple disableFocusRipple>
                        <ArrowBack />
                    </IconButton>
                    Continue Shopping
                </ButtonBase>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <form style={{ display: 'flex' }}>
                        <Paper variant="outlined" sx={{ width: 594, display: 'flex', flexDirection: 'row' }}>
                            <InputBase placeholder="Coupon Code" sx={{ width: 500, m: 1 }} />
                            <Button variant="text" sx={{ width: '20%' }}>
                                Apply
                            </Button>
                        </Paper>
                    </form>
                    <div style={{ width: '100%' }}>
                        <Button variant="contained" fullWidth>
                            Checkout
                        </Button>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default SubmitCart;
