import * as React from 'react';
// Import MUI
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
} from '@mui/material';
// Import React Hooks
import { useTheme, styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
// Import Icon
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// Import Components
import ProductLayout from '../../layout/ProductLayot';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import ProductCardItems from '../../components/cards/products/ProductCardItems';
import sampleData from '@/components/cards/products/SampleData';
//Import react-query
import useGetListBookClient from '@/hooks/client/useGetListBookClient';
import useGetListGenreClient from '@/hooks/client/useGetListGenreClient';
import useGetListAuthorClient from '@/hooks/client/useGetListAuthorClient';
import useGetListPublisherClient from '@/hooks/client/useGetListPublisherClient';
//Drawer style
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
  //Fetch Data
  const getListBookQuery = useGetListBookClient();
  const getListGenreQuery = useGetListGenreClient();
  const getListAuthorQuery = useGetListAuthorClient();
  const getListPublisherQuery = useGetListPublisherClient();
  const {
    data: authorData,
    isLoading: isAuthorLoading,
    isFetching: isAuthorFetching,
  } = getListAuthorQuery;
  const {
    data: publisherData,
    isLoading: isPublisherLoading,
    isFetching: isPublisherFetching,
  } = getListPublisherQuery;
  const {
    data: genreData,
    isLoading: isGenreLoading,
    isFetching: isGenreFetching,
  } = getListGenreQuery;
  const {
    data: bookData,
    isLoading: isBookLoading,
    isFetching: isBookFetching,
    refetch,
  } = getListBookQuery;
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
  useEffect(() => {
    if (prevOpenSort.current === true && openSort === false) {
      anchorRef.current.focus();
    }

    prevOpenSort.current = openSort;
  }, [openSort]);

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
        <Stack
          display="flex"
          direction={matches ? 'row' : 'column'}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid p={1}>
            <SearchAdminSection value={searchValue} setValue={setSearchValue} />
          </Grid>
          <Grid
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            {' '}
            <Typography p={1} display={matches ? 'true' : 'none'}>
              |
            </Typography>
            <Button
              startIcon={<FilterAltIcon />}
              onClick={() => handleToggleFilter()}
              sx={{ p: 1 }}
            >
              Lọc
            </Button>
            <Typography p={1}>|</Typography>
            <Typography
              sx={{ fontSize: { xs: '14px', md: '16px' } }}
              variant="h4"
            >
              Sắp xếp theo:{' '}
            </Typography>
            <ButtonGroup ref={anchorRef} aria-label="split button">
              <Button
                variant="text"
                id="composition-button"
                aria-controls={openSort ? 'composition-menu' : undefined}
                aria-expanded={openSort ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleSort}
                endIcon={<KeyboardArrowDownIcon />}
                color="primary"
              >
                {sortOptions[selectedIndex]}
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 2,
              }}
              open={openSort}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper sx={{ backgroundColor: '#fff' }}>
                    <ClickAwayListener onClickAway={handleCloseSort}>
                      <MenuList
                        autoFocusItem={openSort}
                        id="split-button-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDownSort}
                      >
                        {sortOptions.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleSortItemClick(event, index)
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Stack>
        <Box sx={{ display: 'flex' }}>
          {/* Render Products */}
          <Main open={openFilter} theme={theme}>
            <ProductCardItems
              slideToShow={4}
              isLoading={isBookLoading}
              data={bookData?.data}
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
                <CardContent>
                  <Grid container display="flex">
                    <Grid item xs={12}>
                      <Typography variant="h4">Danh mục</Typography>
                      <FormControl>
                        <Grid display="flex">
                          <FormControlLabel
                            label="Sách tiếng Việt"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Sách ngoại văn"
                            control={<Checkbox />}
                          />
                        </Grid>
                      </FormControl>
                      <Typography variant="h4">Thể loại</Typography>
                      <FormControl>
                        <Grid display="flex" container>
                          <FormControlLabel
                            label="Văn học"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Kinh tế"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Tâm lý - Kỹ năng sống"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Sách giáo khoa"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Tham khảo"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Tiểu sử - Hồi ký"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Sách học ngoại ngữ"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Ngôn tình"
                            control={<Checkbox />}
                          />
                          <FormControlLabel
                            label="Thiếu nhi"
                            control={<Checkbox />}
                          />
                        </Grid>
                      </FormControl>
                      <Typography variant="h4">GIÁ</Typography>
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
                        color="error"
                        variant="contained"
                        onClick={handleClearAllFilter}
                      >
                        Xóa Tất Cả Lọc
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            </div>
          </Drawer>
        </Box>
      </MainCard>
    </ProductLayout>
  );
};

export default Product;
