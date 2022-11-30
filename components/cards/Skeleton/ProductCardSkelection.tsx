import { Box, Skeleton } from '@mui/material';

const ProductCardSkeleton = ({ slideMode = false }) => {
  return (
    <Box>
      <Box>
        <Skeleton variant="rectangular" height={slideMode ? 112 : 200} />
      </Box>
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
        <Skeleton width="50%" />
      </Box>
    </Box>
  );
};
export default ProductCardSkeleton;
