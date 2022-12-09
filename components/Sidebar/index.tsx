import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from '../../store/constant';
import { ISideBar } from '@/interfaces/layout.interface';

const Sidebar: React.FunctionComponent<ISideBar> = ({
  drawerOpen,
  drawerToggle,
  window,
}) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={() => drawerToggle()}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
              <LogoSection />
            </Box>
          </Box>
          <BrowserView>
            <PerfectScrollbar
              component="div"
              style={{
                height: !matchUpMd
                  ? 'calc(100vh - 56px)'
                  : 'calc(100vh - 88px)',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <MenuList />
            </PerfectScrollbar>
          </BrowserView>
          <MobileView>
            <Box sx={{ px: 2 }}>
              <MenuList />
            </Box>
          </MobileView>
        </>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
