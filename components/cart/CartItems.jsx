import { Grid, Tabs, Tab } from '@mui/material';
import { useCallback, useState } from 'react';
import { ShoppingCart, Apartment, Payment } from '@mui/icons-material';

import ProductAdded from './ProductAdded';
import ItemTable from './ItemTable';
import OrderSummary from './OrderSummary';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemTableMobile from './ItemTableMobile';
import ConfirmModal from './../modals/ConfirmModal';

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
    const matches = useMediaQuery('(min-width:900px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [listItem, setListItem] = useState(sampleData);
    const [showConfirmModal, setShowConfirmModal] = useState(null);
    const handleChange = (event, newValue) => {
        setCurrentIndex(newValue);
    };
    const handleIncreaseQuantity = useCallback(
        (id) => {
            const newListItem = listItem.map((item) => {
                if (item?.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            setListItem(newListItem);
        },
        [listItem, setListItem]
    );
    const handleDecreaseQuantity = useCallback(
        (id) => {
            const decreaseItem = listItem.find((item) => item.id === id);
            if (decreaseItem?.quantity === 1) {
                console.log(!decreaseItem.id);
                setShowConfirmModal(decreaseItem?.id);
            } else {
                const newListItem = listItem.map((item) => {
                    if (item?.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
                setListItem(newListItem);
            }
        },
        [listItem, setListItem]
    );
    const handleDelete = useCallback(
        (id) => {
            setListItem(listItem.filter((item) => item.id !== id));
        },
        [setListItem, listItem]
    );
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Tabs value={currentIndex} onChange={handleChange} variant="scrollable" scrollButtons={false}>
                        <Tab icon={<ShoppingCart />} label="Giỏ" disabled={currentIndex !== 0} />
                        <Tab icon={<Apartment />} label="Thông tin địa chỉ" disabled={currentIndex !== 1} />
                        <Tab icon={<Payment />} label="Thanh toán" disabled={currentIndex !== 2} />
                    </Tabs>
                </Grid>
                {listItem?.length > 0 && (
                    <>
                        <Grid item xs={12}>
                            <ProductAdded amount={listItem.length} />
                        </Grid>
                        <Grid item xs={12}>
                            {matches ? (
                                <ItemTable
                                    items={listItem}
                                    setListItem={setListItem}
                                    handleIncreaseQuantity={handleIncreaseQuantity}
                                    handleDecreaseQuantity={handleDecreaseQuantity}
                                    handleDelete={handleDelete}
                                />
                            ) : (
                                <ItemTableMobile
                                    items={listItem}
                                    setListItem={setListItem}
                                    handleIncreaseQuantity={handleIncreaseQuantity}
                                    handleDecreaseQuantity={handleDecreaseQuantity}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <OrderSummary items={listItem} />
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitCart setCurrentIndex={setCurrentIndex} />
                        </Grid>
                    </>
                )}

                {listItem?.length === 0 && (
                    <Grid item xs={12} sx={{ p: 30 }}>
                        <EmptyCart />
                    </Grid>
                )}
            </Grid>
            <ConfirmModal
                open={showConfirmModal !== null}
                contentHeader="Xóa sản phẩm"
                textContent="Bạn có muốn xóa sản phẩm đang chọn?"
                confirmContent="Xác nhận"
                cancelContent="Hủy"
                handleClose={() => setShowConfirmModal(null)}
                handleConfirm={() => {
                    handleDelete(showConfirmModal);
                    setShowConfirmModal(null);
                }}
            />
        </>
    );
};

export default CartItems;
