import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { makeStyles } from '@mui/styles';
import config from '../../config';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  carousel: {
    position: 'relative',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    '& .swiper-pagination-bullet': {
      width: '10px',
      height: '10px',
      backgroundColor: '#fff',
    },
    '& .swiper-pagination-bullet-active': { backgroundColor: '#673ab7' },
    '& .swiper-slide-active': { width: '100%' },
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    '& img': {
      width: '100%',
      maxHeight: '25rem',
      objectFit: 'cover',
    },
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
const CarouselHome = () => {
  const classes = useStyles();
  const images = [
    'https://wallpaperaccess.com/full/124378.jpg',
    'https://image.winudf.com/v2/image/Y29tLkRyZWFtV2FsbHBhcGVycy5Cb29rMDFfc2NyZWVuc2hvdHNfMF9mNzdhNGRiNw/screen-0.jpg?fakeurl=1&type=.webp',
    'https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
  ];

  return (
    <div className={classes.container}>
      <Swiper
        spaceBetween={1}
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 5000 }}
        className={classes.carousel}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={classes.carouselItem}>
            <img alt={'image' + index} src={image} />
          </SwiperSlide>
        ))}
      </Swiper>{' '}
    </div>
  );
};

export default CarouselHome;
