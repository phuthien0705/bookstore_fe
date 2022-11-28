import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CardMedia, Grid, Rating, Skeleton, Stack, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import ProductCardSkeleton from './ProductCardSkelection';

const useStyles = makeStyles({
    root: (theme) => ({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
        '& .MuiCardMedia-root ': { cursor: 'pointer' },
        '& .MuiTypography-h5': { cursor: 'pointer' },
        maxHeight: '300px',
        height: '100%',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    }),
    slide: (theme) => ({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
        '& .MuiCardMedia-root ': { cursor: 'pointer' },
        '& .MuiTypography-h5': { cursor: 'pointer' },
        height: '220px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    })
});

const ProductCard = ({ product, slideMode = false, isLoading = false }) => {
    const imgRef = useRef(null);
    const theme = useTheme();
    const classes = useStyles(theme);
    const handleClickItem = () => {
        window.location.pathname = `product/${product?.id}`;
    };
    const handleClickAddToCart = () => {
        window.location.pathname = 'cart';
    };
    if (isLoading) return <ProductCardSkeleton />;
    return (
        <Card className={slideMode ? classes.slide : classes.root}>
            <CardMedia
                ref={imgRef}
                component="img"
                height={slideMode ? '150px' : imgRef && imgRef?.current?.offsetWidth ? (imgRef?.current?.offsetWidth * 9) / 16 : '200px'}
                image={product?.book_image}
                alt={product?.name}
                onClick={handleClickItem}
            />
            <CardContent sx={{ padding: 2, height: '100%' }}>
                <Stack spacing={1} direction="column">
                    <Typography
                        gutterBottom
                        variant="h5"
                        sx={{ margin: 0, fontSize: { xs: slideMode ? '12px' : '14px', sm: '14px' } }}
                        onClick={handleClickItem}
                    >
                        {product?.name}
                    </Typography>

                    {!slideMode && (
                        <>
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
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};
ProductCard.propTypes = {
    product: PropTypes.object,
    index: PropTypes.number,
    slideMode: PropTypes.bool,
    isLoading: PropTypes.bool
};
export default ProductCard;
