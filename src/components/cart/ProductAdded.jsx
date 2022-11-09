import { Typography, Stack } from '@mui/material';

import PropTypes from 'prop-types';

const ProductAdded = ({ amount }) => {
    return (
        <Stack direction="row" spacing={1} sx={{ m: 3 }}>
            <div>
                <Typography variant="h5">Cart Item</Typography>
            </div>
            <div>
                <Typography variant="body1">({amount})</Typography>
            </div>
        </Stack>
    );
};

ProductAdded.propTypes = {
    amount: PropTypes.number
};

export default ProductAdded;
