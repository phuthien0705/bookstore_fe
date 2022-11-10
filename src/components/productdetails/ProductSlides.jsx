import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import config from 'config';

import ProductCard from 'components/cards/products/ProductCard';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import 'swiper/css';

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
        name: 'product 2',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 2,
        name: 'product 3',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 3,
        name: 'product 4',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 4,
        name: 'product 5',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 5,
        name: 'product 6',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 6,
        name: 'product 7',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 7,
        name: 'product 8',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    }
];

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

const ProductSlides = () => {
    const classes = useStyles();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className={classes.container}>
            <IconButton variant="contained" color="secondary" className={classes.prev} ref={navigationPrevRef}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Swiper
                slidesPerView={5}
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
                {sampleData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard product={data} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton variant="contained" color="secondary" className={classes.next} ref={navigationNextRef}>
                <KeyboardArrowRightIcon />
            </IconButton>
        </div>
    );
};

export default ProductSlides;
