import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import config from '../../config';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import CustomPagination from '../../components/Paginations/CustomPagination';
import GenreModal from '../../components/modals/GenreModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import PublisherModal from '../../components/modals/PublisherModal';
import { getAllPublisher, deletePublisher } from '../../apis/publisher.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PUBLISHERS } from '../../constants/queryKeyName';
import useGetListPublisher from '../../hooks/useGetListPublisher';
import AdminLayout from '../../layout/AdminLayout';

const PublisherManagement = () => {
    const queryClient = useQueryClient();
    const getListPublisherQuery = useGetListPublisher();
    const { data, isLoading, isFetching, refetch } = getListPublisherQuery;
    const [searchContent, setSearchContent] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [currentProduct, setCurrentProduct] = useState(null);
    const dispatch = useDispatch();
    const toast = useCallback(({ type, message }) => {
        dispatch(toggleSnackbar({ open: true, message, type }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { mutate, isLoading: isMutateLoading } = useMutation(deletePublisher, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(PUBLISHERS);
        },
        onError: () => {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình xóa nhà xuất bản' });
        }
    });

    const toggleModalEdit = useCallback((product) => {
        setCurrentProduct({ data: product });
    }, []);

    const fetchData = useCallback(() => {
        refetch();
    }, [refetch]);

    const handleCloseModal = useCallback(async () => {
        setCurrentProduct(null);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', description: 'ID nhà xuất bản', width: 50 },
        { field: 'name', headerName: 'Tên nhà xuất bản', description: 'Tên nhà xuất bản', width: 200 },
        { field: 'description', headerName: 'Mô tả', description: 'Mô tả nhà xuất bản', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', description: 'Địa chỉ nhà xuất bản', flex: 1 },
        { field: 'phone', headerName: 'Số điện thoại', description: 'Mô tả nhà xuất bản', width: 150 },
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
                        deleteCallback={() => mutate(params?.row?.id)}
                        editCallback={() => toggleModalEdit(params?.row)}
                    />
                );
            }
        }
    ];

    return (
        <AdminLayout>
            {' '}
            <>
                <MainCard title="Danh sách nhà xuất bản" darkTitle>
                    <Stack
                        direction={{ xs: 'column-reverse', sm: 'row' }}
                        alignItems={{ xs: 'flex-end', sm: 'center' }}
                        justifyContent={{ xs: 'space-between', sm: 'space-between' }}
                        spacing={1}
                    >
                        <SearchAdminSection value={searchContent} setValue={setSearchContent} />
                        <Button
                            disabled={isLoading || isFetching}
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
                            loading={isLoading || isFetching || isMutateLoading}
                            columns={columns}
                            rows={data?.publishers || []}
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
                    <PublisherModal
                        open={currentProduct !== null}
                        currentProduct={currentProduct}
                        handleClose={handleCloseModal}
                        refetchAfterClose={fetchData}
                    />
                </MainCard>
            </>
        </AdminLayout>
    );
};

export default PublisherManagement;
