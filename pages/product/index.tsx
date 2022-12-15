import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  IconButton,
  Button,
  Popper,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  ButtonGroup,
  Drawer,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProductLayout from '../../layout/ProductLayot';
import MainCard from '../../components/cards/MainCard';
import ProductCardItems from '../../components/cards/products/ProductCardItems';
import useGetListBookClient from '@/hooks/client/useGetListBookClient';
import useGetListGenreClient from '@/hooks/client/useGetListGenreClient';
import useGetListAuthorClient from '@/hooks/client/useGetListAuthorClient';
import useGetListPublisherClient from '@/hooks/client/useGetListPublisherClient';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';
import { filterBook } from '@/apis/product.api';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { useToast } from '@/hooks/useToast';

const drawerWidth = 400;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);
const Product = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const getListBookQuery = useGetListBookClient();
  const getListGenreQuery = useGetListGenreClient();
  const getListPublisherQuery = useGetListPublisherClient();

  const {
    data: publisherData,
    isLoading: isPublisherLoading,
    isFetching: isPublisherFetching,
  } = getListPublisherQuery;
  const { data: genreData, isLoading: isGenreLoading } = getListGenreQuery;
  const {
    data: bookData,
    isLoading: isBookLoading,
    isFetching: isBookFetching,
    refetch,
  } = getListBookQuery;
  const [listBook, setListBook] = useState<any[]>([]);
  const { mutate: getFilterBook, isLoading: isGetingListFilterBook } =
    useMutation((data: any) => filterBook(data), {
      onSuccess: (data: any) => {
        setListBook(data?.data);
      },
      onError: () => {
        toast({ type: 'error', message: 'Lỗi trong quá trình lấy dữ liệu' });
      },
    });
  //End fetch
  const matches = useMediaQuery('(min-width:700px)');
  const [searchValue, setSearchValue] = useState<string>('');
  const sortOptions = [
    'Giá: Cao → Thấp',
    'Giá: Thấp → Cao',
    'Phổ biến',
    'Giảm giá',
    'Mới nhất',
  ];
  const [openSort, setOpenSort] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const handleToggleFilter = () => {
    setOpenFilter((prevOpenSort) => !prevOpenSort);
  };
  const [genreList, setGenreList] = useState<number[]>([]);
  const anchorRef = useRef<any>(null);
  // Handle Clear Filter
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClearAllFilter = () => {};
  const handleToggleSort = () => {
    setOpenSort((prevOpenSort) => !prevOpenSort);
  };
  const handleSortItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setOpenSort(false);
    // Handle Sort product's view
  };
  const handleCloseSort = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSort(false);
  };

  function handleListKeyDownSort(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenSort(false);
    } else if (event.key === 'Escape') {
      setOpenSort(false);
    }
  }
  const prevOpenSort = useRef(openSort);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let genreParam = '';
    genreList.forEach((genre: number) => {
      genreParam += genre + '_';
    });
    genreParam = genreParam.slice(0, -1);
    getFilterBook({
      genres: genreParam,
      publishers: '',
      price: '',
      order_by: '',
    });
  };
  useEffect(() => {
    if (prevOpenSort.current === true && openSort === false) {
      anchorRef.current.focus();
    }

    prevOpenSort.current = openSort;
  }, [openSort]);
  console.log(listBook);
  useEffect(() => {
    if (router.isReady) {
      getFilterBook({
        genres: router.query?.genre ? router.query?.genre : '',
        publishers: '',
        price: '',
        order_by: '',
      });
    }
  }, [getFilterBook, router]);
  useEffect(() => {
    if (router.isReady && router?.query?.genre) {
      setGenreList([Number(router.query?.genre as any)] || []);
    }
  }, [router]);
  return (
    <ProductLayout>
      <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            ml: 0,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">Nhà sách</Typography>
          <IconButton>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>
          <Typography variant="h4">Sản phẩm</Typography>
        </Container>
      </Paper>
      <MainCard
        title="Tất cả sách có sẵn"
        sx={{ backgroundColor: '#f5f5f5f5' }}
      >
        <Box sx={{ display: 'flex' }}>
          {/* Render Products */}
          <Main open={openFilter} theme={theme}>
            <ProductCardItems
              isLoading={isGetingListFilterBook}
              data={listBook || []}
            />
          </Main>
          <Drawer
            variant={matches ? 'persistent' : 'temporary'}
            anchor="right"
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            sx={{
              zIndex: 0,

              '& .MuiDrawer-paper': {
                mt: matches ? '25px' : '80px',
                borderRadius: matches ? '8px' : '0',
                width: matches ? drawerWidth : '80%',
                height: matches ? 'auto' : '100%',
                position: matches ? 'relative' : 'inherit',
                display: 'flex',
                wordBreak: 'break-work',
              },
            }}
          >
            <div style={{ position: 'relative' }}>
              <Paper
                style={{
                  transform: 'none',
                  transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                  width: '100%',
                }}
              >
                <form onSubmit={handleSubmit}>
                  {' '}
                  <CardContent>
                    <Grid container display="flex">
                      <Grid item xs={12}>
                        <Typography variant="h4">Thể loại</Typography>
                        <FormControl>
                          <Grid display="flex" container>
                            {isGenreLoading ? (
                              <Grid item xs={12}>
                                <Box sx={{ display: 'flex', p: 2 }}>
                                  <CircularProgress size={20} />
                                </Box>
                              </Grid>
                            ) : (
                              genreData?.data?.map(
                                (genre: any, _index: number) => (
                                  <FormControlLabel
                                    key={_index}
                                    label={genre?.name}
                                    checked={
                                      !!genreList?.find(
                                        (item: number) => item === genre?.id
                                      )
                                    }
                                    onChange={() => {
                                      if (
                                        !!genreList?.find(
                                          (item: number) => item === genre?.id
                                        )
                                      ) {
                                        const newGenreList = genreList.filter(
                                          (item) => item !== genre?.id
                                        );
                                        setGenreList(newGenreList);
                                      } else {
                                        setGenreList((pre: number[]) => [
                                          ...pre,
                                          genre?.id,
                                        ]);
                                      }
                                    }}
                                    control={<Checkbox />}
                                  />
                                )
                              )
                            )}
                          </Grid>
                        </FormControl>
                        <Typography variant="h4">Giá</Typography>
                        <FormControl>
                          <RadioGroup row name="row-radio-buttons-group">
                            <FormControlLabel
                              value="pricelist-1"
                              control={<Radio />}
                              label="0 &#x20AB; - 50.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="pricelist-2"
                              control={<Radio />}
                              label="50.000 &#x20AB; - 100.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="pricelist-3"
                              control={<Radio />}
                              label="100.000 &#x20AB; - 200.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="pricelist-4"
                              control={<Radio />}
                              label="Trên 200.000 &#x20AB; "
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          sx={{ marginRight: 1 }}
                        >
                          Lọc
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={handleClearAllFilter}
                        >
                          Xóa Tất Cả Lọc
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Paper>
            </div>
          </Drawer>
        </Box>
      </MainCard>
    </ProductLayout>
  );
};

export default Product;
