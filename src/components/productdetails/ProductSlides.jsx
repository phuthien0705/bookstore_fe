import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import config from 'config';
import ProductCard from 'components/cards/products/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import ProductCardSkeleton from 'components/cards/Skeleton/ProductCardSkelection';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

const useStyles = makeStyles({
    container: {
        position: 'relative'
    },
    carousel: {
        position: 'relative',
        borderRadius: config.borderRadius,
        overflow: 'hidden'
    },
    next: {
        height: 'fit-content',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        right: 0,
        zIndex: 10,
        backgroundColor: '#fff !important',
        translate: '50% -50%'
    },
    prev: {
        height: 'fit-content',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: 0,
        zIndex: 10,
        backgroundColor: '#fff !important',
        translate: '-50% -50%'
    }
});

const ProductSlides = ({ slideData, isSlideLoading, isSlideFetching }) => {
    const classes = useStyles();
    const matchSm = useMediaQuery('(max-width:600px)');
    const matchMd = useMediaQuery('(max-width:900px)');

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className={classes.container}>
            <IconButton variant="contained" color="secondary" className={classes.prev} ref={navigationPrevRef}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Swiper
                slidesPerView={matchSm ? 2 : matchMd ? 3 : 5}
                spaceBetween={5}
                slidesPerGroup={1}
                loop={true}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current
                }}
                modules={[Pagination, Navigation]}
                className={classes.carousel}
                onInit={(swiper) => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                        // Override prevEl & nextEl now that refs are defined
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;

                        // Re-init navigation
                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                    });
                }}
            >
                {/* get only 7 item */}
                {slideData?.data &&
                    slideData?.data.slice(0, 7).map((data, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard product={data} slideMode isLoading={isSlideFetching || isSlideLoading} />
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
            <IconButton variant="contained" color="secondary" className={classes.next} ref={navigationNextRef}>
                <KeyboardArrowRightIcon />
            </IconButton>
        </div>
    );
};
ProductSlides.propTypes = {
    slideData: PropTypes.any,
    isSlideLoading: PropTypes.bool,
    isSlideFetching: PropTypes.bool
};
export default ProductSlides;
