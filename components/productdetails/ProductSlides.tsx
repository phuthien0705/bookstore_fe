import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { makeStyles } from '@mui/styles';
import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material';
import { useRef, FC } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import config from '../../config';
import ProductCard from '../cards/products/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import ProductCardSkeleton from '../cards/Skeleton/ProductCardSkelection';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';
import { IProductSlides } from '@/interfaces/compontents/product.interface';

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  carousel: {
    position: 'relative',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
  },
  next: {
    height: 'fit-content',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff !important',
    translate: '50% -50%',
  },
  prev: {
    height: 'fit-content',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: 0,
    zIndex: 10,
    backgroundColor: '#fff !important',
    translate: '-50% -50%',
  },
});

const ProductSlides: FC<IProductSlides> = ({
  slideData,
  isSlideLoading,
  isSlideFetching,
}) => {
  const classes = useStyles();
  const matchSm = useMediaQuery('(max-width:600px)');
  const matchMd = useMediaQuery('(max-width:900px)');
  return (
    <div className={classes.container}>
      <Swiper
        slidesPerView={matchSm ? 2 : matchMd ? 3 : 5}
        spaceBetween={5}
        slidesPerGroup={1}
        loop={true}
        navigation
        modules={[Pagination, Navigation]}
        className={classes.carousel}
      >
        {/* get only 7 item */}
        {slideData?.data &&
          slideData?.data.slice(0, 7).map((data: any, index: number) => (
            <SwiperSlide key={index}>
              <ProductCard
                product={data}
                slideMode
                isLoading={isSlideFetching || isSlideLoading}
                index={index}
              />
            </SwiperSlide>
          ))}
        {(isSlideLoading || isSlideFetching) && (
          <>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSlides;
