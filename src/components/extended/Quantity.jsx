import { ButtonGroup, Button } from '@mui/material';
import { useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import PropTypes from 'prop-types';

const QuantityButton = ({ init }) => {
    const [value, setValue] = useState(init);

    const handleAdd = () => {
        setValue(value + 1);
    };

    const handleMinus = () => {
        if (value > 1) {
            setValue(value - 1);
        }
    };

    return (
        <ButtonGroup size="small">
            <Button onClick={handleMinus}>
                <Remove />
            </Button>
            <Button>{value}</Button>
            <Button onClick={handleAdd}>
                <Add />
            </Button>
        </ButtonGroup>
    );
};

QuantityButton.propTypes = {
    init: PropTypes.number
};

export default QuantityButton;
