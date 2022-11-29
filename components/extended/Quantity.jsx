import { ButtonGroup, Button } from '@mui/material';
import { useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import PropTypes from 'prop-types';

const QuantityButton = ({ currentQuantity, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    return (
        <ButtonGroup size="small" color="primary">
            <Button sx={{ padding: 0 }} onClick={handleDecreaseQuantity}>
                <Remove />
            </Button>
            <Button sx={{ padding: 0 }}>{currentQuantity}</Button>
            <Button sx={{ padding: 0 }} onClick={handleIncreaseQuantity}>
                <Add />
            </Button>
        </ButtonGroup>
    );
};

QuantityButton.propTypes = {
    currentQuantity: PropTypes.number,
    handleIncreaseQuantity: PropTypes.func,
    handleDecreaseQuantity: PropTypes.func
};

export default QuantityButton;
