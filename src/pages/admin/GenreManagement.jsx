import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import SearchAdminSection from 'components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from 'components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import config from 'config';
import MenuActionAdmin from 'components/menus/MenuActionAdmin';
import CustomPagination from 'components/Paginations/CustomPagination';
import { deleteGenre, getAllGenre } from 'apis/genre.api';
import GenreModal from 'components/modals/GenreModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSnackbar } from 'store/snackbarReducer';
import { setGenresGlobal } from 'store/adminDataReducer';

const GenreManagement = () => {
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    // const [rows, setRows] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const dispatch = useDispatch();
    const toast = useCallback(({ type, message }) => {
        dispatch(toggleSnackbar({ open: true, message, type }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const rows = useSelector((state) => state.adminData.genres);
    const setRows = (data) => {
        dispatch(setGenresGlobal(data));
    };
    const deleteGenreCallback = useCallback(async (id) => {
        try {
            await deleteGenre(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình xóa thể loại' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleModalEdit = useCallback((product) => {
        setCurrentProduct({ data: product });
    }, []);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllGenre();
            setRows(res.genres);
            setIsLoading(false);
        } catch (error) {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình lấy dữ liệu' });
            setIsLoading(false);
        }
    }, [toast]);
    const handleCloseModal = useCallback(async () => {
        setCurrentProduct(null);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
        { field: 'name', headerName: 'Tên sản phẩm', description: 'Tên sản phẩm', width: 200 },
        { field: 'description', headerName: 'Mô tả', description: 'Mô tả sản phẩm', flex: 1 },
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
                        deleteCallback={() => deleteGenreCallback(params?.row?.id)}
                        editCallback={() => toggleModalEdit(params?.row)}
                    />
                );
            }
        }
    ];

    useEffect(() => {
        console.log({ currentProduct, rows });
    });
    useEffect(() => {
        rows === null && fetchData();
    }, [fetchData]);

    return (
        <>
            <MainCard title="Danh sách thể loại" darkTitle>
                <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    alignItems={{ xs: 'flex-end', sm: 'center' }}
                    justifyContent={{ xs: 'space-between', sm: 'space-between' }}
                    spacing={1}
                >
                    <SearchAdminSection value={searchContent} setValue={setSearchContent} />
                    <Button
                        disabled={isLoading}
                        variant="contained"
                        sx={{ width: { xs: '100%', sm: '18rem' }, whiteSpace: 'nowrap', boxShadow: 'none' }}
                        onClick={() => setCurrentProduct({ data: null })}
                    >
                        <Stack sx={{ padding: '5px 10px 5px 2px' }} direction="row" alignItems="center" spacing={0.5}>
                            <AddIcon fontSize="small" />
                            <Typography>Thêm thể loại</Typography>
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
                        disableColumnMenu
                        loading={isLoading}
                        columns={columns}
                        rows={rows || []}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                            LoadingOverlay: LinearProgress,
                            Pagination: CustomPagination
                        }}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                    />
                </Box>
                <GenreModal
                    open={currentProduct !== null}
                    currentProduct={currentProduct}
                    handleClose={handleCloseModal}
                    refetchAfterClose={fetchData}
                />
            </MainCard>
        </>
    );
};

export default GenreManagement;
