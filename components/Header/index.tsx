import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Container,
  Typography,
  Stack,
  Divider,
  Link,
} from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { IconMenu2 } from '@tabler/icons';
import CartSection from './CartSection';
import BelowSection from './BelowSection';
import { FC } from 'react';

interface IHeader {
  handleLeftDrawerToggle: Function;
  hideSidebarIcon?: boolean;
  hideSearch?: boolean;
  hideCart?: boolean;
  hideNoti?: boolean;
}

const Header: FC<IHeader> = ({
  handleLeftDrawerToggle,
  hideSidebarIcon = false,
  hideSearch = false,
  hideCart = false,
  hideNoti = false,
}) => {
  const theme: any = useTheme();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="column" sx={{ display: 'flex', width: '90%' }}>
        <Container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              width: 'auto',
              display: 'flex',
              [theme.breakpoints.down('md')]: {
                width: 'auto',
              },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
            >
              <LogoSection />
            </Box>
            {!hideSidebarIcon && (
              <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light,
                    },
                  }}
                  color="inherit"
                  onClick={() => handleLeftDrawerToggle()}
                >
                  <IconMenu2 stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            )}
          </Box>

          {/* header search */}
          {!hideSearch && <SearchSection />}
          <Box sx={{ flexGrow: 1 }} />
          {/* notification & profile & cart */}
          {!hideNoti && <NotificationSection />}
          {!hideCart && <CartSection />}
          <ProfileSection />
        </Container>
        <BelowSection />
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
};

export default Header;
