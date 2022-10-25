import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import Header from 'components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setMenu } from 'store/sidebarReducer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    ...theme.typography.mainContent
}));

const ProductLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const leftDrawerOpened = useSelector((state) => state.sidebar.open);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch(toggleSidebar());
    };
    useEffect(() => {
        dispatch(setMenu(!matchDownMd));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} hideSidebarIcon />
                </Toolbar>
            </AppBar>
            <Main theme={theme}>
                <Outlet />
            </Main>
        </Box>
    );
};

export default ProductLayout;
