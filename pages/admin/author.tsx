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
import { deleteAuthor, getAllAuthor } from '../../apis/author.api';
import AuthorModal from '../../components/modals/AuthorModal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AUTHORS } from '../../constants/queryKeyName';
import useGetListAuthor from '../../hooks/useGetListAuthor';
import AdminLayout from '../../layout/AdminLayout';

const AuthorManagement = () => {
  const queryClient = useQueryClient();
  const getListAuthorQuery = useGetListAuthor();
  const { data, isLoading, isFetching, refetch } = getListAuthorQuery;
  const [searchContent, setSearchContent] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );
  const { mutate, isLoading: isMutateLoading } = useMutation(deleteAuthor, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(AUTHORS);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa tác giả',
      });
    },
  });

  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct({ data: product });
  }, []);
  const handleCloseModal = useCallback(() => {
    setCurrentProduct(null);
  }, []);
  const fetchData = useCallback(async () => {
    refetch();
  }, [refetch]);
  const columns = [
    { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      description: 'Tên sản phẩm',
      flex: 1,
    },
    {
      field: 'bio',
      headerName: 'Tiểu sử',
      description: 'Tiểu sử tác giả',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email tác giả',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Điện thoại',
      description: 'Số điện thoại',
      flex: 1,
    },
    {
      field: 'actions',

      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <MenuActionAdmin
            id={params?.row?.id}
            deleteCallback={() => mutate(params?.row?.id)}
            editCallback={() => toggleModalEdit(params?.row)}
          />
        );
      },
    },
  ];

  return (
    <AdminLayout>
      {' '}
      <>
        <MainCard title="Danh sách tác giả" darkTitle>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            alignItems={{ xs: 'flex-end', sm: 'center' }}
            justifyContent={{ xs: 'space-between', sm: 'space-between' }}
            spacing={1}
          >
            <SearchAdminSection
              value={searchContent}
              setValue={setSearchContent}
            />
            <Button
              disabled={isLoading || isFetching}
              variant="contained"
              sx={{
                width: { xs: '100%', sm: '18rem' },
                whiteSpace: 'nowrap',
                boxShadow: 'none',
              }}
              onClick={() => setCurrentProduct({ data: null })}
            >
              <Stack
                sx={{ padding: '5px 10px 5px 2px' }}
                direction="row"
                alignItems="center"
                spacing={0.5}
              >
                <AddIcon fontSize="small" />
                <Typography>Thêm tác giả</Typography>
              </Stack>
            </Button>
          </Stack>
          <Box mt={2}>
            <DataGrid
              sx={{
                border: 1,
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: `${config.borderRadius}px`,
              }}
              disableSelectionOnClick
              autoHeight
              disableColumnMenu
              loading={isLoading || isFetching || isMutateLoading}
              columns={columns}
              rows={data?.authors || []}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: LinearProgress,
                Pagination: CustomPagination,
              }}
              pageSize={pageSize}
              onPageSizeChange={(newPage) => setPageSize(newPage)}
              pagination
            />
          </Box>
          <AuthorModal
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

export default AuthorManagement;
