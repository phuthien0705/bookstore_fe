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
    MenuList
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
const Product = () => {
    const [openSort, setOpenSort] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleSort = () => {
        setOpenSort((prevOpenSort) => !prevOpenSort);
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
                    <Typography variant="h3">Nhà sách</Typography>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                    <Typography variant="h3">Sản phẩm</Typography>
                </Container>
            </Paper>
            <MainCard title="Tất cả sách" sx={{ backgroundColor: '#f5f5f5f5' }}>
                <Grid container>
                    <Grid item xs={12} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" spacing={10}>
                        <Grid p={1}>
                            <SearchAdminSection />
                        </Grid>
                        <Typography p={1}>|</Typography>
                        <Button p={1} startIcon={<FilterAltIcon />}>
                            Lọc
                        </Button>
                        <Typography p={1}>|</Typography>
                        <Typography variant="h4">Sắp xếp theo: </Typography>
                        <Grid>
                            <Button
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={openSort ? 'composition-menu' : undefined}
                                aria-expanded={openSort ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleSort}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                Phổ biến
                            </Button>
                            <Popper
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
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseSort}>
                                                <MenuList
                                                    autoFocusItem={openSort}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDownSort}
                                                >
                                                    <MenuItem onClick={handleCloseSort}>Giá: Cao &gt; Thấp</MenuItem>
                                                    <MenuItem onClick={handleCloseSort}>Giá: Thấp &gt; Cao</MenuItem>
                                                    <MenuItem onClick={handleCloseSort}>Phổ biến</MenuItem>
                                                    <MenuItem onClick={handleCloseSort}>Giảm giá</MenuItem>
                                                    <MenuItem onClick={handleCloseSort}>Mới nhất</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </Grid>

                    <Grid container columnSpacing={2}>
                        <Grid item xs={8} container columnSpacing={2} rowSpacing={2}>
                            {sampleData.map((data, index) => (
                                <Grid item xs={3}>
                                    <ProductCard key={index} product={data} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ border: '1px solid' }}>
                                <CardContent>
                                    <Typography>Giới tính</Typography>
                                    <Typography>Giới tính</Typography>
                                    <Typography>Giới tính</Typography>
                                    <Typography>Giới tính</Typography>
                                    <Typography>Giới tính</Typography>
                                    <Typography>Giới tính</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Product;
