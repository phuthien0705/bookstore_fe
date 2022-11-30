import { ButtonGroup, Button } from '@mui/material';
import { useState, FC } from 'react';
import { Add, Remove } from '@mui/icons-material';

interface IQuantityButton {
  currentQuantity: number;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
}

const QuantityButton: FC<IQuantityButton> = ({
  currentQuantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  return (
    <ButtonGroup size="small" color="primary">
      <Button sx={{ padding: 0 }} onClick={() => handleDecreaseQuantity()}>
        <Remove />
      </Button>
      <Button sx={{ padding: 0 }}>{currentQuantity}</Button>
      <Button sx={{ padding: 0 }} onClick={() => handleIncreaseQuantity()}>
        <Add />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityButton;
