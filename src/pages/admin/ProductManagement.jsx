/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch, useSelector } from 'react-redux';
import { toggleSnackbar } from 'store/snackbarReducer';
import BookModal from 'components/modals/BookModal';
import { getAllPublisher } from 'apis/publisher.api';
import { getAllGenre } from 'apis/genre.api';
import { getAllAuthor } from 'apis/author.api';
import { setAuthorsGlobal, setBooksGlobal, setGenresGlobal, setPublishersGlobal } from 'store/adminDataReducer';
import { useIsMutating, useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { AUTHORS, BOOKS, GENRES, PUBLISHERS } from 'constants/queryKeyName';
import useGetListBook from 'hooks/useGetListBook';
import useGetListGenre from 'hooks/useGetListGenre';
import useGetListAuthor from 'hooks/useGetListAuthor';
import useGetListPublisher from 'hooks/useGetListPublisher';

const ImageStyle = styled('img')({
    width: '80%',
    borderRadius: 4,
    objectFit: 'cover'
});
const ProductManagement = () => {
    const queryClient = useQueryClient();
    const getListBookQuery = useGetListBook();
    const getListGenreQuery = useGetListGenre();
    const getListAuthorQuery = useGetListAuthor();
    const getListPublisherQuery = useGetListPublisher();
    const { data: authorData, isLoading: isAuthorLoading, isFetching: isAuthorFetching } = getListAuthorQuery;
    const { data: publisherData, isLoading: isPublisherLoading, isFetching: isPublisherFetching } = getListPublisherQuery;
    const { data: genreData, isLoading: isGenreLoading, isFetching: isGenreFetching } = getListGenreQuery;
    const { data: bookData, isLoading: isBookLoading, isFetching: isBookFetching, refetch } = getListBookQuery;

    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    const findPublisher = useCallback((id) => {
        if (publisherData?.publishers) {
            return publisherData?.publishers.find((publisher) => publisher.id === id);
        }
    }, []);
    const findGenre = useCallback((id) => {
        if (genreData?.genres) {
            return genreData?.genres.find((genre) => genre.id === id);
        }
    }, []);
    const findAuthor = useCallback((id) => {
        if (authorData?.authors) {
            return authorData?.authors.find((author) => author.id === id);
        }
    }, []);

    const toast = useCallback(({ type, message }) => {
        dispatch(toggleSnackbar({ open: true, message, type }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { mutate, isLoading: isMutateLoading } = useMutation(deleteBook, {
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            toast({ type: 'error', message: 'Xảy ra lỗi trong quá trình xóa sản phẩm' });
        }
    });

    const toggleModalEdit = useCallback((product) => {
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
            field: 'image',
            headerName: 'Hình ảnh',
            description: 'Hình ảnh sản phẩm',
            width: 100,
            renderCell: (params) => {
                return <ImageStyle src={`${process.env.REACT_APP_API_URL}/storage/${params?.row?.book_image}`} alt={params?.row?.name} />;
            }
        },
        { field: 'name', headerName: 'Tên sản phẩm', description: 'Tên sản phẩm', width: 200 },
        { field: 'description', headerName: 'Mô tả', description: 'Mô tả sản phẩm', flex: 1 },
        { field: 'price', headerName: 'Giá', description: 'Giá sản phẩm', width: 100, renderCell: (params) => <p>{params?.value}đ</p> },
        { field: 'rating', headerName: 'Đánh giá', description: 'Đánh giá sản phẩm', width: 100 },
        { field: 'available_quantity', headerName: 'Số lượng', description: 'Số lượng sản phẩm', width: 100 },
        { field: 'total_pages', headerName: 'Số trang', description: 'Số trang', width: 100 },

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
                        disabled={
                            isAuthorLoading ||
                            isGenreLoading ||
                            isPublisherLoading ||
                            isAuthorFetching ||
                            isGenreFetching ||
                            isPublisherFetching ||
                            isBookFetching ||
                            isBookLoading ||
                            isMutateLoading
                        }
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
                        loading={
                            isAuthorLoading ||
                            isGenreLoading ||
                            isPublisherLoading ||
                            isAuthorFetching ||
                            isGenreFetching ||
                            isPublisherFetching ||
                            isBookFetching ||
                            isBookLoading ||
                            isMutateLoading
                        }
                        columns={columns}
                        rows={bookData?.books || []}
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
                    authors={authorData?.authors}
                    genres={genreData?.genres}
                    publishers={publisherData?.publishers}
                    findAuthor={findAuthor}
                    findGenre={findGenre}
                    findPublisher={findPublisher}
                />
            </MainCard>
        </>
    );
};

export default ProductManagement;
