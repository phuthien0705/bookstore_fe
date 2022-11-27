import { Grid, ButtonBase, IconButton, Stack, Paper, InputBase, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const SubmitCart = () => {
    return (
        <Grid container sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
            <Grid item xs={8}>
                <ButtonBase sx={{ display: 'flex' }}>
                    <IconButton disableRipple disableFocusRipple>
                        <ArrowBack />
                    </IconButton>
                    Tiếp tục mua hàng
                </ButtonBase>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <form style={{ width: '100%' }}>
                        <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <InputBase placeholder="Mã" sx={{ width: '100%', p: 2 }} />
                                </Grid>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <Button variant="text">Áp dụng</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                    <div style={{ width: '100%' }}>
                        <Button variant="contained" fullWidth>
                            Tiếp theo
                        </Button>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default SubmitCart;
