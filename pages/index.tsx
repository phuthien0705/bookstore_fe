import * as React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useGetListBookClient from '../hooks/client/useGetListBookClient';
import useGetListGenreClient from '../hooks/client/useGetListGenreClient';
import useGetListAuthorClient from '../hooks/client/useGetListAuthorClient';
import useGetListPublisherClient from '../hooks/client/useGetListPublisherClient';
import ProductCardItems from '../components/cards/products/ProductCardItems';
import ProductLayout from '@/layout/ProductLayot';
import CarouselCustumized from '@/components/carousel/CarouselCustumized';

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
    <ProductLayout>
      {' '}
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <CarouselCustumized />
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
    </ProductLayout>
  );
};

export default Home;
