import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import { IconMenu2 } from '@tabler/icons';
import CartSection from './CartSection';
import { FC } from 'react';
import { IHeader } from '@/interfaces/compontents/header.interface';
import useGetListCart from '@/hooks/client/useGetListCart';

const Header: FC<IHeader> = ({
  handleLeftDrawerToggle,
  hideSidebarIcon = false,
  hideSearch = false,
  hideCart = false,
  hideNoti = false,
}) => {
  const theme: any = useTheme();
  const { data, isLoading, isFetching, refetch } = useGetListCart();

  return (
    <>
      <Box
        sx={{
          width: 228,
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
                cursor: 'pointer',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                fontSize: '1.2rem',
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
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile & cart */}
      {!hideCart && (
        <CartSection
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          refetch={refetch}
        />
      )}
      <ProfileSection />
    </>
  );
};

export default Header;
