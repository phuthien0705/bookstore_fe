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
        name: 'Gatsby Vĩ Đại',
        description:
            'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 1,
        name: 'Không Gia Đình (Bìa Cứng)',
        description:
            'Không gia đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '130000',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Nhà Thờ Đức Bà Paris (Bìa Cứng) (Tái Bản 2021)',
        description:
            'Nhà thờ Đức Bà Paris là tác phẩm tiêu biểu cho phong cách sáng tác theo khuynh hướng lãng mạn của Victor Hugo. Cũng nhờ thành công của tác phẩm mà ông được biết đến như một nhà văn nhân đạo, lãng mạn bậc nhất của nước Pháp. Bằng cốt truyện khá bi thảm, nặng nề, các tình tiết xếp đặt khéo léo, mang kịch tính và hình ảnh tô đậm, phóng đại, lẫn lộn thực hư, kết hợp với bút pháp miêu tả thật rực rỡ, kỳ thú, Victor Hugo đã vẽ nên một bức tranh thu nhỏ về xã hội Pháp thế kỷ XV.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '142000',
        rating: 4.5
    },
    {
        id: 3,
        name: 'Những Ngày Thơ Ấu (Tái Bản 2019)',
        description:
            'Những Ngày Thơ Ấu "Những ngày thơ ấu có thể coi là một phẩm xuất sắc. Đây là tập hồi ký về tuổi thơ ghi lại những rung động cực điểm của một linh hồn trẻ dại" - Thạch Lam "Một nghệ sĩ đã thực hiện hết mình, đã mang được vào sự nghiệp sáng tác hết tất cả những cái đáng giá nhất mà mình muốn nói với người đời, là một người sung sướng nhất… Nguyên Hồng là nhà văn đã có cái hạnh phúc tuyệt vời ấy"',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '34000',
        rating: 4.5
    },
    {
        id: 4,
        name: 'Ba Tước Monte Cristo',
        description:
            'Sắp được giao trọng trách làm một thuyền trưởng, chuẩn bị cưới nàng Mercédès xinh đẹp dịu dàng, có một người cha hết mực thương yêu, được anh em bè bạn mến phục, tương lai của chàng thanh niên Edmond Dantès thật rạng ngời hạnh phúc. Nhưng số mệnh nghiệt ngã, vẽ nên viễn cảnh tươi sáng để rồi bôi đen tất cả. Đúng trong ngày hạnh phúc nhất đời, anh bị bắt giam vào hầm ngục lâu đài khi chưa đầy hai mươi tuổi bởi âm mưu của những kẻ ghen ghét, đố kị và cơ hội.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '45000',
        rating: 4.5
    },
    {
        id: 5,
        name: 'Những Cuộc Phiêu Lưu Của Huckleberry Finn',
        description:
            'Những cuộc phiêu lưu của Huckleberry Finn không chỉ là một câu chuyện kể về những cuộc phiêu lưu ly kỳ của hai chàng thanh niên, một da đen, một da trắng, mà còn là một bản án sâu sắc tố cáo những cái bỉ ổi của một xã hội chỉ biết lấy đồng đô la và lấy sự phân biệt chủng tộc, bóc lột áp bức làm nội dung chính cho những quan hệ giữa người này với người khác.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '53950',
        rating: 4.5
    },
    {
        id: 6,
        name: 'Đảo Giấu Vàng',
        description:
            'Một hòn đảo chơi vơi giữa biển, đêm ngày ầm ầm sóng vỗ, bỗng có một sức lôi cuốn kỳ diệu chỉ vì nó giấu trong lòng một kho vàng do băng cướp của viên thuyền trưởng Flint cất giấu. Ai sẽ đoạt được kho vàng, bọn cướp còn lại trong các băng của Flint hay là những người khác?',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        id: 7,
        name: 'Don Quichotte',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '3000',
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
