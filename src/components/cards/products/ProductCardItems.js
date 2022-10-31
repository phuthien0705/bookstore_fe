import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCardItem from './ProductCardItem';

const ProductCardItems = ({ data }) => {
    const renderProducts = () => {
        return data?.length > 0 ? (
            data.map((product, index) => {
                return <ProductCardItem key={index} product={product} />;
            })
        ) : (
            <p>Chưa có sản phẩm.</p>
        );
    };

    return (
        <Grid container spacing={{ xs: 1, lg: 2 }}>
            {renderProducts()}
        </Grid>
    );
};
ProductCardItems.propTypes = {
    data: PropTypes.any.isRequired
};
export default ProductCardItems;
