import { makeStyles } from '@mui/styles';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRef } from 'react';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import { IProductCard } from '@/interfaces/compontents/card.interface';

const useStyles = makeStyles({
  root: {
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    maxHeight: '350px',
    height: '100%',
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  slide: {
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    height: '220px',
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
});

const ProductCard: React.FunctionComponent<IProductCard> = ({
  product,
  slideMode = false,
  isLoading = false,
}) => {
  const imgRef = useRef(null);
  const classes = useStyles();
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
        height={slideMode ? '150px' : '200px'}
        image={product?.book_image}
        alt={product?.name}
        onClick={handleClickItem}
      />
      <CardContent sx={{ padding: 2, height: '100%' }}>
        <Stack spacing={1} direction="column" alignItems={'space-between'}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              display: 'inline-block',
              margin: 0,
              fontSize: { xs: slideMode ? '12px' : '14px', sm: '14px' },
              height: '50px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            onClick={handleClickItem}
          >
            {product?.name}
          </Typography>

          {!slideMode && (
            <>
              <Rating
                size="small"
                name="read-only"
                value={product?.rating}
                readOnly
                precision={0.5}
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  fontWeight="bold"
                  component="div"
                  color="#000"
                  fontSize="16px"
                >
                  {product?.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ padding: 0, width: 'fit-content', minWidth: 0 }}
                  onClick={handleClickAddToCart}
                >
                  <ShoppingCartOutlinedIcon
                    fontSize="small"
                    sx={{ margin: '5px 10px' }}
                  />
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
