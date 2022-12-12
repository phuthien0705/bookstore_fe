import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Container,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import CartSection from './CartSection';
import { FC } from 'react';
import { IHeader } from '@/interfaces/compontents/header.interface';
import useGetListCart from '@/hooks/client/useGetListCart';
import BelowSection from './BelowSection';
import GenreSection from './GenreSection';

const Header: FC<IHeader> = ({
  handleLeftDrawerToggle,
  hideSidebarIcon = false,
  hideSearch = false,
  hideCart = false,
  maxWidth = 'lg',
  hideBelowSection = false,
  hideGenreSection = false,
}) => {
  const theme: any = useTheme();
  const { data, isLoading, isFetching, refetch } = useGetListCart();

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          paddingTop: 1,
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
            alignItems: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              flexGrow: 1,
              marginRight: 4,
            }}
          >
            <LogoSection />
          </Box>
          {!hideGenreSection && <GenreSection />}
          {!hideSidebarIcon && (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => handleLeftDrawerToggle()}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                padding: '5px',
                margin: 0,
                height: 'fit-content',
                width: 'fit-content !important',
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {/* header search */}
        {!hideSearch && <SearchSection />}
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
      {!hideBelowSection && <BelowSection />}
    </Container>
  );
};
export default Header;
