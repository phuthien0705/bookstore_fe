import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import SearchAdminSection from 'components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from 'components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import config from 'config';
import MenuActionAdmin from 'components/menus/MenuActionAdmin';
import CustomPagination from 'components/Paginations/CustomPagination';
import { deleteBook, getAllBook } from 'apis/product.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from 'store/snackbarReducer';
import BookModal from 'components/modals/BookModal';
const ImageStyle = styled('img')({
    width: '80%',
    borderRadius: 4,
    objectFit: 'cover'
});
const ProductManagement = () => {
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const dispatch = useDispatch();
    const toast = useCallback(({ type, message }) => {
        dispatch(toggleSnackbar({ open: true, message, type }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const deleteBookCallback = useCallback(async (id) => {
        try {
            await deleteBook(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình xóa thể loại' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const toggleModalEdit = useCallback((product) => {
        setCurrentProduct({ data: product });
    }, []);
    const handleCloseModal = useCallback(() => {
        setCurrentProduct(null);
    }, []);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllBook();

            setRows(res.data);
            setIsLoading(false);
        } catch (error) {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình lấy dữ liệu' });
            setIsLoading(false);
        }
    }, [toast]);
    const columns = [
        { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
        {
            field: 'image',
            headerName: 'Hình ảnh',
            description: 'Hình ảnh sản phẩm',
            width: 100,
            renderCell: (params) => {
                return <ImageStyle src={params.value} alt={params?.row?.name} />;
            }
        },
        { field: 'name', headerName: 'Tên sản phẩm', description: 'Tên sản phẩm', width: 200 },
        { field: 'description', headerName: 'Mô tả', description: 'Mô tả sản phẩm', flex: 1 },
        { field: 'price', headerName: 'Giá', description: 'Giá sản phẩm', width: 100, renderCell: (params) => <p>{params?.value}đ</p> },
        { field: 'rating', headerName: 'Đánh giá', description: 'Đánh giá sản phẩm', width: 100 },
        { field: 'quantity', headerName: 'Số lượng', description: 'Số lượng sản phẩm', width: 100 },

        {
            field: 'actions',

            headerName: 'Thao tác',
            description: 'Thao tác',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <MenuActionAdmin
                        id={params?.row?.id}
                        deleteCallback={() => deleteBookCallback(params?.row?.id)}
                        editCallback={() => toggleModalEdit(params?.row)}
                    />
                );
            }
        }
    ];
    const sampleData = [
        {
            id: 0,
            name: 'product 1',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        },
        {
            id: 1,
            name: 'product 2',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        },
        {
            id: 2,
            name: 'product 3',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        },
        {
            id: 3,
            name: 'product 4',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        },
        {
            id: 4,
            name: 'product 5',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        },
        {
            id: 5,
            name: 'product 6',
            description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
            image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            price: '30000',
            rating: 4.5,
            quantity: 100
        }
    ];

    useEffect(() => {
        console.log({ selectionModel, currentProduct, rows });
    });
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    console.log(process.env.REACT_APP_API_URL);
    return (
        <>
            <MainCard title="Danh sách các sản phẩm" darkTitle>
                <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    alignItems={{ xs: 'flex-end', sm: 'center' }}
                    justifyContent={{ xs: 'space-between', sm: 'space-between' }}
                    spacing={1}
                >
                    <SearchAdminSection value={searchContent} setValue={setSearchContent} />
                    <Button
                        variant="contained"
                        sx={{ width: { xs: '100%', sm: '18rem' }, whiteSpace: 'nowrap', boxShadow: 'none' }}
                        onClick={() => setCurrentProduct({ data: null })}
                    >
                        <Stack sx={{ padding: '5px 10px 5px 2px' }} direction="row" alignItems="center" spacing={0.5}>
                            <AddIcon fontSize="small" />
                            <Typography>Thêm sản phẩm</Typography>
                        </Stack>
                    </Button>
                </Stack>
                <Box mt={2}>
                    <DataGrid
                        sx={{
                            border: 1,
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                            borderRadius: `${config.borderRadius}px`
                        }}
                        disableSelectionOnClick
                        autoHeight
                        checkboxSelection
                        disableColumnMenu
                        loading={isLoading}
                        columns={columns}
                        rows={rows}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                            LoadingOverlay: LinearProgress,
                            Pagination: CustomPagination
                        }}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        // page={page}
                        // onPageChange={(newPage) => setPage(newPage)}

                        pagination
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                        selectionModel={selectionModel}
                    />
                </Box>
                <BookModal
                    open={currentProduct !== null}
                    currentProduct={currentProduct}
                    handleClose={handleCloseModal}
                    refetchAfterClose={fetchData}
                />
            </MainCard>
        </>
    );
};

export default ProductManagement;
