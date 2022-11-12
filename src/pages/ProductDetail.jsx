import { Container, Paper, Stack, Typography } from '@mui/material';
import ProductInfo from 'components/productdetails/ProductInfo';
import ProductSlides from 'components/productdetails/ProductSlides';
import ProductCard from 'components/cards/products/ProductCard';

const sampleData = {
    id: 0,
    name: 'Gatsby Vĩ Đại',
    description:
        'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
    image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '30000',
    rating: 4.5
};

const sampleSpec = {
    id: 0,
    provider: 'Cty Sách Hương Giang',
    author: 'F Scott Fitzgerald',
    publisher: 'Thế Giới',
    totalpages: 200,
    weight: 550,
    datepublished: '06/2015'
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
                        Thông tin sản phẩm
                    </Typography>
                    <Stack direction="row" spacing={9}>
                        <div>
                            <Typography variant="h4">Nhà Cung Cấp</Typography>
                            <Typography variant="h4">Tác giả</Typography>
                            <Typography variant="h4">NXB</Typography>
                            <Typography variant="h4">Số trang</Typography>
                            <Typography variant="h4">Trọng lượng (gr)</Typography>
                            <Typography variant="h4">Năm XB</Typography>
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
            <h2> Sản phẩm liên quan </h2>
            <ProductSlides />
        </Container>
    );
};

export default ProductDetail;
