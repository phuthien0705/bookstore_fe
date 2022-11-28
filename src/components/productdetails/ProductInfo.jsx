import { Grid, Stack, ButtonBase, Button, Typography, Rating, Chip, Box } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

import QuantityButton from 'components/extended/Quantity';

const ProductInfo = ({ data }) => {
    return (
        <Grid container sx={{ pt: 4, pl: 4, pr: 4 }}>
            <Grid item xs={12} md={6} sx={{}}>
                <div>
                    <img src={data.image} alt={data.name} width="90%" height="90%" style={{ borderRadius: '10px', objectFit: 'cover' }} />
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container>
                    <Grid item xs={12} sx={{ p: { xs: 1, md: 2.5 } }}>
                        <Stack direction="column" spacing={1}>
                            <Chip variant="outlined" label="In Stock" size="small" color="success" sx={{ width: '10%' }} />
                            <Typography variant="h3">{data.name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ p: { xs: 1, md: 2.5 } }}>
                        <Typography variant="body1">{data.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: { xs: 1, md: 2.5 } }}>
                        <Stack direction="row" spacing={1}>
                            <Rating value={data.rating} precision={0.5} readOnly />
                            <Typography variant="body1">(69+)</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ p: { xs: 1, md: 2.5 } }}>
                        <Stack direction="row" sx={{ display: 'flex', columnGap: 2 }}>
                            <Button variant="contained" color="secondary" sx={{}}>
                                <ShoppingCartOutlined />
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="contained">Mua ngay</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ProductInfo.propTypes = {
    data: PropTypes.object
};

export default ProductInfo;
