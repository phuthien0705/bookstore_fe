import * as React from 'react';
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid, Rating, Container, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProductCardItems from 'components/cards/products/ProductCardItems';
import CarouselHome from 'components/carousel/CarouselHome';

const sampleData = [
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    }
];

const Home = () => {
    const theme = useTheme();

    return (
        <Container>
            <CarouselHome />
            <ProductCardItems data={sampleData} />
        </Container>
    );
};

export default Home;
