import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Chip, Pagination, Stack, Typography } from '@mui/material';
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
import CustomChip from 'components/chip/CustomChip';
const ImageStyle = styled('img')({
    width: '80%',
    borderRadius: 4,
    objectFit: 'cover'
});
const UserManagement = () => {
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    const deleteProduct = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        []
    );
    const toggleModalEdit = useCallback((product) => {
        setCurrentProduct(product);
    }, []);
    const handleCloseProductModal = useCallback(() => {
        setCurrentProduct(null);
    }, []);
    const columns = [
        { field: 'id', headerName: 'ID', description: 'ID', width: 50 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            description: 'Hình nền',
            width: 100,
            renderCell: (params) => {
                return <ImageStyle src={params.value} alt={params?.row?.name} />;
            }
        },
        { field: 'name', headerName: 'Họ tên', description: 'Họ tên', flex: 1 },
        { field: 'email', headerName: 'Email', description: 'Email', flex: 1 },
        {
            field: 'role',
            headerName: 'Phân quyền',
            description: 'Phân quyền',
            width: 100,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={0.5}>
                        {params.row.role.map((i, _index) => (
                            <CustomChip key={_index} content={i} type={'default'} />
                        ))}
                    </Stack>
                );
            }
        },
        {
            field: 'active',
            headerName: 'Trạng thái',
            description: 'Trạng thái',
            width: 150,
            renderCell: (params) => {
                return (
                    <CustomChip
                        content={params.row.active ? 'Hoạt động' : 'Ngừng hoạt động'}
                        type={params.row.active ? 'success' : 'error'}
                    />
                );
            }
        },

        {
            field: 'actions',

            headerName: 'Thao tác',
            description: 'Thao tác',
            width: 80,

            renderCell: (params) => {
                return (
                    <MenuActionAdmin
                        id={params?.row?.id}
                        deleteCallback={() => deleteProduct(params?.row?.id)}
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
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['user', 'admin'],
            active: false
        },
        {
            id: 1,
            name: 'product 2',
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['user'],
            active: true
        },
        {
            id: 2,
            name: 'product 3',
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['admin'],
            active: true
        },
        {
            id: 3,
            name: 'product 4',
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['user', 'admin'],
            active: false
        },
        {
            id: 4,
            name: 'product 5',
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['user'],
            active: true
        },
        {
            id: 5,
            name: 'product 6',
            avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
            email: 'huaphuthienksst@gmail.com',
            role: ['user', 'admin'],
            active: true
        }
    ];
    useEffect(() => {
        setRows(sampleData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        console.log({ selectionModel, currentProduct });
    });
    return (
        <>
            <MainCard title="Danh sách người dùng" darkTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <SearchAdminSection value={searchContent} setValue={setSearchContent} />
                    <Button variant="contained" sx={{ padding: '5px 10px 5px 2px' }}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <AddIcon fontSize="small" />
                            <Typography>Thêm người dùng</Typography>
                        </Stack>
                    </Button>
                </Stack>{' '}
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
                {/* <ProductAdminModal open={currentProduct !== null} handleClose={handleCloseProductModal} /> */}
            </MainCard>
        </>
    );
};

export default UserManagement;
