import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useGetListBookClient from '../hooks/client/useGetListBookClient';
import useGetListGenreClient from '../hooks/client/useGetListGenreClient';
import ProductCardItems from '../components/cards/products/ProductCardItems';
import CarouselCustumized from '@/components/carousel/CarouselCustumized';
import HomeLayout from '@/layout/HomeLayout';

const Home = () => {
  const theme = useTheme();
  const getListBookQuery = useGetListBookClient();
  const getListGenreQuery = useGetListGenreClient();

  const {
    data: genreData,
    isLoading: isGenreLoading,
    isFetching: isGenreFetching,
  } = getListGenreQuery;
  const {
    data: bookData,
    isLoading: isBookLoading,
    isFetching: isBookFetching,
    refetch,
  } = getListBookQuery;

  const renderGenres = () => {
    if (!isGenreLoading) {
      return (
        genreData &&
        genreData?.data?.slice(0, 4)?.map((genre: any, _index: number) => {
          return (
            <ProductCardItems
              key={_index}
              slideToShow={5}
              isLoading={isBookLoading}
              data={bookData?.data}
              title={genre?.name}
              titleBackground={'#e8d5f9'}
              genreId={genre?.id}
            />
          );
        })
      );
    }
  };
  return (
    <HomeLayout>
      <CarouselCustumized />
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: '8px', md: '16px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <ProductCardItems
            slideToShow={5}
            isLoading={isBookLoading}
            data={bookData?.data}
            title="Xu hướng mua sắm"
            titleIcon={<LocalFireDepartmentIcon color="error" />}
            titleBackground="#FCDDEF"
          />
          {renderGenres()}
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default Home;
