import { Box, Skeleton } from '@mui/material';

const ProductCardSkeleton = () => {
    return (
        <Box>
            <Box>
                <Skeleton variant="rectangular" height={112} />
            </Box>
            <Box sx={{ pt: 0.5 }}>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
            </Box>
        </Box>
    );
};
export default ProductCardSkeleton;
