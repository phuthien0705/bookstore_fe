import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu, toggleSidebar } from '../../store/sidebarReducer';
import { NextPageWithLayout } from '@/pages/page';
import NavigationScroll from '../NavigationScroll';
import { ILayout } from '@/interfaces/layout.interface';
import dynamic from 'next/dynamic';
import CustomizedSnackbar from '@/components/snackbar/CustomizedSnackbar';
import useGetListCart from '@/hooks/client/useGetListCart';

const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }: { theme: any }) => ({
    ...theme?.typography?.mainContent2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0,
  })
);

const ProductLayout: NextPageWithLayout<ILayout> = ({ children }) => {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const leftDrawerOpened = useSelector((state: any) => state.sidebar.open);

  const handleLeftDrawerToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    dispatch(setMenu(!matchDownMd));
  }, [dispatch, matchDownMd]);
  return (
    <NavigationScroll>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <CssBaseline />
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.default,
            transition: leftDrawerOpened
              ? theme.transitions.create('width')
              : 'none',
          }}
        >
          <Toolbar sx={{ paddingTop: 0, paddingBottom: '8px' }}>
            <Header
              handleLeftDrawerToggle={handleLeftDrawerToggle}
              hideSidebarIcon
              hideBelowSection
            />
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" disableGutters>
          <Main theme={theme}>{children}</Main>
        </Container>
        <Footer />
      </Box>
      <CustomizedSnackbar />
    </NavigationScroll>
  );
};

export default ProductLayout;
