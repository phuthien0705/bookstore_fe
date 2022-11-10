import { Container, Paper, Stack, Typography } from '@mui/material';
import ProductInfo from 'components/productdetails/ProductInfo';
import ProductSlides from 'components/productdetails/ProductSlides';
import ProductCard from 'components/cards/products/ProductCard';

const sampleData = {
    id: 0,
    name: 'product 1',
    description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
    image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '30000',
    rating: 4.5
};

const sampleSpec = {
    id: 0,
    provider: 'dsfwgefw',
    author: 'sqf psoa',
    publisher: 'serwa dsfagpb asdg',
    totalpages: 100,
    weight: 500,
    datepublished: '2022'
};

const ProductDetail = () => {
    return (
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
            <Paper sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" sx={{ p: 1 }}>
                    <ProductInfo data={sampleData} />
                </Stack>
                <Stack sx={{ p: 4 }}>
                    <Typography variant="h3" sx={{ p: 3 }}>
                        Thong tin
                    </Typography>
                    <Stack direction="row" spacing={9}>
                        <div>
                            <Typography variant="h4">Nha cung cap</Typography>
                            <Typography variant="h4">Tac gia</Typography>
                            <Typography variant="h4">Nha xuat ban</Typography>
                            <Typography variant="h4">Tong so trang</Typography>
                            <Typography variant="h4">Trong luong</Typography>
                            <Typography variant="h4">Nam xuat ban</Typography>
                        </div>
                        <div>
                            <Typography variant="body2">{sampleSpec.provider}</Typography>
                            <Typography variant="body2">{sampleSpec.author}</Typography>
                            <Typography variant="body2">{sampleSpec.publisher}</Typography>
                            <Typography variant="body2">{sampleSpec.totalpages}</Typography>
                            <Typography variant="body2">{sampleSpec.weight}</Typography>
                            <Typography variant="body2">{sampleSpec.datepublished}</Typography>
                        </div>
                    </Stack>
                </Stack>
            </Paper>
            <h2> Related Product </h2>
            <ProductSlides />
        </Container>
    );
};

export default ProductDetail;
