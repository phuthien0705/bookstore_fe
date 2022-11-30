import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../../store/sidebarReducer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0
}));

const ProductLayout = ({ children }) => {
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
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', p: 3 }}>
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
            <Main theme={theme}>{children}</Main>
            <Footer />
        </Box>
    );
};

export default ProductLayout;
