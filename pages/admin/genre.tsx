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
import { deleteGenre, getAllGenre } from '../../apis/genre.api';
import GenreModal from '../../components/modals/GenreModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GENRES } from '../../constants/queryKeyName';
import useGetListGenre from '../../hooks/useGetListGenre';
import AdminLayout from '../../layout/AdminLayout';

const GenreManagement = () => {
  const queryClient = useQueryClient();
  const getListGenreQuery = useGetListGenre();
  const { data, isLoading, isFetching, refetch } = getListGenreQuery;
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
  const { mutate, isLoading: isMutateLoading } = useMutation(deleteGenre, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(GENRES);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa thể loại',
      });
    },
  });

  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct({ data: product });
  }, []);

  const fetchData = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCloseModal = useCallback(async () => {
    setCurrentProduct(null);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      description: 'Tên sản phẩm',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      description: 'Mô tả sản phẩm',
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
      <>
        <MainCard title="Danh sách thể loại" darkTitle>
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
                <Typography>Thêm thể loại</Typography>
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
              rows={data?.genres || []}
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
          <GenreModal
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

export default GenreManagement;
