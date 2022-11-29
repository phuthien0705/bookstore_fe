import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Snackbar, Toolbar, useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { setMenu, toggleSidebar } from './../../store/sidebarReducer';
import CustomizedSnackbar from './../../components/snackbar/CustomizedSnackbar';
import authService from './../../services/authService';
import { appDrawerWidth, drawerWidth } from '../../store/constant';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

const AdminLayout = ({ children }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
    const leftDrawerOpened = useSelector((state) => state.sidebar.open);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch(toggleSidebar());
    };
    useLayoutEffect(() => {
        if (!authService.isAuthenticated()) {
            window.location = '/login';
        }
    }, []);
    useEffect(() => {
        dispatch(setMenu(!matchDownMd));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <>
            {' '}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
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
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} hideSearch hideCart hideNoti />
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

                {/* main content */}
                <Main theme={theme} open={leftDrawerOpened}>
                    {children}
                </Main>
            </Box>
            <CustomizedSnackbar />
        </>
    );
};

export default AdminLayout;
