import { Grid, Stack, ButtonBase, Button, Typography, Rating, Chip, Box, Skeleton } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ProductInfo = ({ data, isLoading }) => {
    return (
        <Grid container sx={{ pt: { xs: 2, sm: 4 }, pl: { xs: 2, sm: 4 }, pr: { xs: 2, sm: 4 } }}>
            <Grid item xs={12} sm={4} md={6} sx={{}}>
                <Box sx={{ width: { xs: '100%' }, height: { xs: '100%' }, borderRadius: '10px' }}>
                    {isLoading ? (
                        <Skeleton variant="rectangular" height={'100%'} />
                    ) : (
                        <img
                            src={data?.book_image}
                            alt={data?.name}
                            width="100%"
                            height="100%"
                            style={{ borderRadius: '10px', objectFit: 'contain' }}
                        />
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <Grid container sx={{ marginLeft: { xs: 0, sm: '1rem', md: '2rem' } }}>
                    <Grid item xs={12} sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}>
                        <Stack direction="column" spacing={1}>
                            <Chip variant="outlined" label="In Stock" size="small" color="success" sx={{ width: '10%' }} />
                            <Typography variant="h3">{data?.name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}>
                        <Typography variant="body1">{data?.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}>
                        <Stack direction="row" spacing={1}>
                            <Rating value={data?.rating} precision={0.5} readOnly />
                            <Typography variant="body1">(69+)</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ px: { xs: 0, md: 2.5 }, py: { xs: 1, md: 2.5 } }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ display: 'flex', columnGap: 2, rowGap: 2 }}>
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
    data: PropTypes.object,
    isLoading: PropTypes.bool
};

export default ProductInfo;
