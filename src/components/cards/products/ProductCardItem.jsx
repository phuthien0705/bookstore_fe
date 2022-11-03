import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Construction } from '@mui/icons-material';

const useStyles = makeStyles({
    root: (theme) => ({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
        '& .MuiCardMedia-root ': { cursor: 'pointer' },
        '& .MuiTypography-h5': { cursor: 'pointer' }
    })
});

const ProductCardItem = ({ product, index }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const classes = useStyles(theme);
    const handleClickItem = () => {
        navigate(`product/${product?.id}`);
    };
    const handleClickAddToCart = () => {
        navigate('cart');
    };
    return (
        <Grid item xs={12 / 5} key={index} sx={{ padding: 0.5 }}>
            <Card className={classes.root} sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="200" image={product?.image} alt={product?.name} onClick={handleClickItem} />
                <CardContent sx={{ padding: 2 }}>
                    <Stack spacing={1} direction="column">
                        <Typography gutterBottom variant="h5" component="div" sx={{ margin: 0 }} onClick={handleClickItem}>
                            {product?.name}
                        </Typography>
                        <Stack>
                            <Rating size="small" name="read-only" value={product?.rating} readOnly precision={0.5} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom fontWeight="bold" component="div" color="#000" fontSize="16px">
                                {product?.price}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ padding: 0, width: 'fit-content', minWidth: 0 }}
                                onClick={handleClickAddToCart}
                            >
                                <ShoppingCartOutlinedIcon fontSize="small" sx={{ margin: '5px 10px' }} />
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};
ProductCardItem.propTypes = {
    product: PropTypes.object,
    index: PropTypes.number
};
export default ProductCardItem;
