import { Grid, Stack, ButtonBase, Button, Typography, Rating, Chip } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

import QuantityButton from 'components/extended/Quantity';

const ProductInfo = ({ data }) => {
    return (
        <Grid container>
            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <img src={data.image} alt={data.name} width="600" height="450" style={{ 'border-radius': '10px' }} />
                </div>
            </Grid>
            <Grid xs={6}>
                <Grid container>
                    <Grid item xs={12} sx={{ p: 2.5 }}>
                        <Stack direction="column" spacing={1}>
                            <Chip variant="outlined" label="In Stock" size="small" color="success" sx={{ width: '10%' }} />
                            <Typography variant="h3">{data.name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '15px' }}>
                        <Typography variant="body1">{data.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2.5 }}>
                        <Stack direction="row" spacing={1}>
                            <Rating value={data.rating} precision={0.5} readOnly />
                            <Typography variant="body1">(69+)</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2.5 }}>
                        <Stack direction="row" spacing={4}>
                            <Typography variant="body1" align="center">
                                Quantity
                            </Typography>
                            <QuantityButton init={1} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" sx={{ display: 'flex' }}>
                            <ButtonBase sx={{ width: '50%' }}>
                                <Button color="secondary" variant="contained" sx={{ width: '100%', p: 1, m: 0.5 }}>
                                    <ShoppingCartOutlined />
                                    Add to cart
                                </Button>
                            </ButtonBase>
                            <Button variant="contained" sx={{ width: '50%', p: 1, m: 0.5 }}>
                                Buy now
                            </Button>
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
