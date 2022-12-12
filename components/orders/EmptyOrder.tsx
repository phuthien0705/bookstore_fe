import { Grid, Typography } from '@mui/material';

const EmptyOrder: React.FunctionComponent = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          Giỏ hàng trống
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Bạn chưa mua đơn hàng nào.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyOrder;
