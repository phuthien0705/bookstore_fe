import * as React from 'react';
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
    Drawer
} from '@mui/material';
import MainCard from 'components/cards/MainCard';
import ProductCard from 'components/cards/products/ProductCard';
import { useTheme, styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import sampleData from 'components/cards/products/SampleData';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchAdminSection from 'components/Header/SearchSection/SearchAdmin';
//Style Filter drawer
const drawerWidth = 450;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));
const Product = () => {
    const sortOptions = ['Giá: Cao → Thấp', 'Giá: Thấp → Cao', 'Phổ biến', 'Giảm giá', 'Mới nhất'];
    const [openSort, setOpenSort] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const theme = useTheme();
    const [openFilter, setOpenFilter] = useState(false);
    const handleToggleFilter = () => {
        setOpenFilter((prevOpenSort) => !prevOpenSort);
    };

    const anchorRef = useRef(null);
    // Handle Clear Filter
    const handleClearAllFilter = () => {};
    const handleToggleSort = () => {
        setOpenSort((prevOpenSort) => !prevOpenSort);
    };
    const handleSortItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpenSort(false);
        // Handle Sort product's view
    };
    const handleCloseSort = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenSort(false);
    };

    function handleListKeyDownSort(event) {
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
        <>
            <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
                <Container sx={{ display: 'flex', flexDirection: 'row', ml: 0, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h4">Nhà sách</Typography>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h4">Sản phẩm</Typography>
                </Container>
            </Paper>
            <MainCard title="Tất cả sách có sẵn" sx={{ backgroundColor: '#f5f5f5f5' }}>
                <Box csx={{ display: 'flex' }}>
                    <Grid item xs={12} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" spacing={10}>
                        <Grid p={1}>
                            <SearchAdminSection />
                        </Grid>
                        <Typography p={1}>|</Typography>
                        <Button p={1} startIcon={<FilterAltIcon />} onClick={handleToggleFilter}>
                            Lọc
                        </Button>
                        <Typography p={1}>|</Typography>
                        <Typography variant="h4">Sắp xếp theo: </Typography>
                        <Grid>
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
                                    zIndex: 2
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
                                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
                                        }}
                                    >
                                        <Paper backgroundColor="#fff">
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
                                                            onClick={(event) => handleSortItemClick(event, index)}
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
                    </Grid>
                    <Box sx={{ display: 'flex' }}>
                        {/* Render Product */}
                        <Main open={openFilter}>
                            <Grid container display="flex" flexDirection="row" columnSpacing={2} rowSpacing={2}>
                                {sampleData.map((data, index) => (
                                    <Grid item xs={12} sm={9} md={6} lg={3}>
                                        <ProductCard key={index} product={data} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Main>
                        <Drawer
                            variant="persistent"
                            anchor="right"
                            open={openFilter}
                            sx={{
                                zIndex: 0,
                                width: drawerWidth,
                                '& .MuiDrawer-paper': {
                                    mt: '25px',
                                    borderRadius: '8px',
                                    width: drawerWidth,
                                    height: drawerWidth,
                                    position: 'relative',
                                    display: 'flex'
                                }
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <Paper
                                    rounded
                                    style={{
                                        transform: 'none',
                                        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
                                    }}
                                >
                                    <CardContent>
                                        <Grid container display="flex">
                                            <Grid item xs={12}>
                                                <Typography variant="h4">Danh mục</Typography>
                                                <FormControl>
                                                    <Grid display="flex">
                                                        <FormControlLabel label="Sách tiếng Việt" control={<Checkbox />} />
                                                        <FormControlLabel label="Sách ngoại văn" control={<Checkbox />} />
                                                    </Grid>
                                                </FormControl>
                                                <Typography variant="h4">Thể loại</Typography>
                                                <FormControl>
                                                    <Grid display="flex" container>
                                                        <FormControlLabel label="Văn học" control={<Checkbox />} />
                                                        <FormControlLabel label="Kinh tế" control={<Checkbox />} />
                                                        <FormControlLabel label="Tâm lý - Kỹ năng sống" control={<Checkbox />} />
                                                        <FormControlLabel label="Sách giáo khoa" control={<Checkbox />} />
                                                        <FormControlLabel label="Tham khảo" control={<Checkbox />} />
                                                        <FormControlLabel label="Tiểu sử - Hồi ký" control={<Checkbox />} />
                                                        <FormControlLabel label="Sách học ngoại ngữ" control={<Checkbox />} />
                                                        <FormControlLabel label="Ngôn tình" control={<Checkbox />} />
                                                        <FormControlLabel label="Thiếu nhi" control={<Checkbox />} />
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
                                            <Grid item xs={12} display="flex" flexDirection="row" justifyContent="center">
                                                <Button color="error" variant="contained" onClick={handleClearAllFilter}>
                                                    Xóa Tất Cả Lọc
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper>
                            </div>
                        </Drawer>
                    </Box>
                </Box>
            </MainCard>
        </>
    );
};

export default Product;
