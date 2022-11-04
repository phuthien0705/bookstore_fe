import * as React from 'react';
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid, Rating, Container, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProductCardItems from 'components/cards/products/ProductCardItems';
import CarouselHome from 'components/carousel/CarouselHome';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
const sampleData = [
    {
        id: 0,
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 1,
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 2,
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 3,
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 4,
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
        <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
            <CarouselHome />
            <ProductCardItems
                data={sampleData}
                title="Xu hướng mua sắm"
                titleIcon={<LocalFireDepartmentIcon color="error" />}
                titleBackground="#FCDDEF"
            />
            <ProductCardItems data={sampleData} title="Sách tham khảo" titleBackground={theme.palette.secondary.light} />
            <ProductCardItems data={sampleData} title="Sách học ngoại ngữ" titleBackground={theme.palette.secondary.light} />
            <ProductCardItems data={sampleData} title="Sách văn học" titleBackground={theme.palette.secondary.light} />
            <ProductCardItems data={sampleData} title="Sách tâm lỹ kỹ năng" titleBackground={theme.palette.secondary.light} />
            <ProductCardItems data={sampleData} title="Sách kinh tế" titleBackground={theme.palette.secondary.light} />
        </Container>
    );
};

export default Home;
