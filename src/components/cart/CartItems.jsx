import { Grid, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { ShoppingCart, Apartment, Payment } from '@mui/icons-material';

import ProductAdded from './ProductAdded';
import ItemTable from './ItemTable';
import OrderSummary from './OrderSummary';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';

const sampleData = [
    {
        id: 0,
        name: 'Gatsby Vĩ Đại',
        description:
            'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5,
        quantity: 1
    },
    {
        id: 1,
        name: 'Không Gia Đình (Bìa Cứng)',
        description:
            'Không gia đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới.',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '130000',
        rating: 4.5,
        quantity: 1
    }
];

const CartItems = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const listlength = sampleData.length;
    console.log(listlength);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab icon={<ShoppingCart />} label="Giỏ" />
                    <Tab icon={<Apartment />} label="Thông tin địa chỉ" disabled />
                    <Tab icon={<Payment />} label="Thanh toán" disabled />
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                <ProductAdded amount={listlength} />
            </Grid>
            {listlength > 0 ? (
                <>
                    <Grid item xs={12}>
                        <ItemTable items={sampleData} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderSummary items={sampleData} />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitCart />
                    </Grid>
                </>
            ) : (
                <Grid item xs={12} sx={{ p: 30 }}>
                    <EmptyCart />
                </Grid>
            )}
        </Grid>
    );
};

export default CartItems;
