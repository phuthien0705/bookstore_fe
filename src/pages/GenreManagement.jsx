import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import SearchAdminSection from 'components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from 'components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import config from 'config';
import ProductAdminModal from 'components/modals/ProductAdminModal';
import MenuActionAdmin from 'components/menus/MenuActionAdmin';
import CustomPagination from 'components/Paginations/CustomPagination';
import { getAllGenre } from 'apis/genre.api';
import GenreModal from 'components/modals/GenreModal';

const GenreManagement = () => {
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    const deleteGenre = useCallback((id) => setRows((prevRows) => prevRows.filter((row) => row.id !== id)), []);
    const toggleModalEdit = useCallback((product) => {
        setCurrentProduct({ data: product });
    }, []);
    const handleCloseProductModal = useCallback(() => {
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

            renderCell: (params) => {
                return (
                    <MenuActionAdmin
                        id={params?.row?.id}
                        deleteCallback={() => deleteGenre(params?.row?.id)}
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
        (async () => {
            const res = await getAllGenre();
            setRows(res.genres);
        })();
    }, []);

    return (
        <>
            <MainCard title="Danh sách thể loại" darkTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <SearchAdminSection value={searchContent} setValue={setSearchContent} />
                    <Button variant="contained" sx={{ padding: '5px 10px 5px 2px' }} onClick={() => setCurrentProduct({ data: null })}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
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
                        rows={rows}
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
                <GenreModal open={currentProduct !== null} currentProduct={currentProduct} handleClose={handleCloseProductModal} />
            </MainCard>
        </>
    );
};

export default GenreManagement;
