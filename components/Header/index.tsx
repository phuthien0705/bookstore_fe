import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Stack, Container } from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import { IconMenu2 } from '@tabler/icons';
import CartSection from './CartSection';
import { FC } from 'react';
import { IHeader } from '@/interfaces/compontents/header.interface';
import useGetListCart from '@/hooks/client/useGetListCart';
import BelowSection from './BelowSection';

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
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {' '}
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
        {!hideCart && (
          <CartSection
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            refetch={refetch}
          />
        )}
        <ProfileSection />
      </Box>
      <BelowSection />
    </Container>
  );
};
export default Header;
