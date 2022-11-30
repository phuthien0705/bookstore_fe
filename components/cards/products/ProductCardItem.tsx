import ProductCard from './ProductCard';
import { Grid, Box } from '@mui/material';

const ProductCardItem = ({
  product,
  index,
}: {
  product: any;
  index: number;
}) => {
  return (
    <Box key={index} sx={{ padding: 0.5 }}>
      <ProductCard product={product} index={index} />
    </Box>
  );
};

export default ProductCardItem;
