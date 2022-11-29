import ProductCard from './ProductCard';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

const ProductCardItem = ({ product, index }) => {
    return (
        <div key={index} sx={{ padding: 0.5 }}>
            <ProductCard product={product} index={index} />
        </div>
    );
};

ProductCardItem.propTypes = {
    product: PropTypes.any,
    index: PropTypes.number
};

export default ProductCardItem;