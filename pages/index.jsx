import * as React from 'react';
import { Container, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useGetListBookClient from '../hooks/client/useGetListBookClient';
import useGetListGenreClient from '../hooks/client/useGetListGenreClient';
import useGetListAuthorClient from '../hooks/client/useGetListAuthorClient';
import useGetListPublisherClient from '../hooks/client/useGetListPublisherClient';
import ProductLayout from '../layout/ProductLayot';
import CarouselHome from './../components/carousel/CarouselHome';
import ProductCardItems from './../components/cards/products/ProductCardItems';

const Home = () => {
    const theme = useTheme();
    const getListBookQuery = useGetListBookClient();
    const getListGenreQuery = useGetListGenreClient();
    const getListAuthorQuery = useGetListAuthorClient();
    const getListPublisherQuery = useGetListPublisherClient();
    const { data: authorData, isLoading: isAuthorLoading, isFetching: isAuthorFetching } = getListAuthorQuery;
    const { data: publisherData, isLoading: isPublisherLoading, isFetching: isPublisherFetching } = getListPublisherQuery;
    const { data: genreData, isLoading: isGenreLoading, isFetching: isGenreFetching } = getListGenreQuery;
    const { data: bookData, isLoading: isBookLoading, isFetching: isBookFetching, refetch } = getListBookQuery;
    console.log(bookData?.data);
    return (
        <ProductLayout>
            {' '}
            <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
                <CarouselHome />
                <ProductCardItems
                    slideToShow={4}
                    isLoading={isBookLoading}
                    data={bookData?.data}
                    title="Xu hướng mua sắm"
                    titleIcon={<LocalFireDepartmentIcon color="error" />}
                    titleBackground="#FCDDEF"
                />
                {/* <ProductCardItems data={sampleData} title="Sách tham khảo" titleBackground={theme.palette.secondary.light} />
       <ProductCardItems data={sampleData} title="Sách học ngoại ngữ" titleBackground={theme.palette.secondary.light} />
       <ProductCardItems data={sampleData} title="Sách văn học" titleBackground={theme.palette.secondary.light} />
       <ProductCardItems data={sampleData} title="Sách tâm lỹ kỹ năng" titleBackground={theme.palette.secondary.light} />
       <ProductCardItems data={sampleData} title="Sách kinh tế" titleBackground={theme.palette.secondary.light} /> */}
            </Container>
        </ProductLayout>
    );
};

export default Home;
