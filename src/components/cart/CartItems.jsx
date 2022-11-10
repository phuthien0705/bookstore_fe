import { Grid, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { ShoppingCart, Apartment, Payment } from '@mui/icons-material';

import ProductAdded from './ProductAdded';
import ItemTable from './ItemTable';
import OrderSummary from './OrderSummary';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';

const sampleData = [
    {
        id: 0,
        name: 'product 0',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '29999',
        quantity: 1
    },
    {
        id: 1,
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '29999',
        quantity: 1
    }
];

const CartItems = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const listlength = sampleData.length;
    console.log(listlength);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab icon={<ShoppingCart />} label="Product Added" />
                    <Tab icon={<Apartment />} label="Address" disabled />
                    <Tab icon={<Payment />} label="Payment" disabled />
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                <ProductAdded amount={listlength} />
            </Grid>
            {listlength > 0 ? (
                <>
                    <Grid item xs={12}>
                        <ItemTable items={sampleData} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderSummary items={sampleData} />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitCart />
                    </Grid>
                </>
            ) : (
                <Grid item xs={12} sx={{ p: 30 }}>
                    <EmptyCart />
                </Grid>
            )}
        </Grid>
    );
};

export default CartItems;
