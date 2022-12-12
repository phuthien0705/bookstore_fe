import {
  ButtonBase,
  Box,
  Typography,
  Menu,
  MenuList,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGetListGenreClient from '@/hooks/client/useGetListGenreClient';
import CircularProgress from '@mui/material/CircularProgress';

const GenreSection: React.FunctionComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();

  const getListGenreQuery = useGetListGenreClient();
  const {
    data: genreData,
    isLoading: isGenreLoading,
    isFetching: isGenreFetching,
  } = getListGenreQuery;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    router.push('/product');
  };

  const open = Boolean(anchorEl);
  return (
    <Box sx={{}}>
      <ButtonBase
        onMouseEnter={handleOpen}
        sx={{
          width: '110%',
          height: '40px',
          transition: 'all .2s ease-in-out',
          background: '#ffffff',
          color: theme.palette.secondary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
            background: '#ffffff',
            color: theme.palette.secondary.dark,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '19px',
            fontWeight: 600,
          }}
        >
          Sản Phẩm
        </Typography>
      </ButtonBase>
      <Menu
        id="menu-genre"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={2}
        sx={{
          marginTop: 1.7,
          height: '500px',
          '.MuiList-root': {
            border: 'none !important',
            outline: 'none !important',
            padding: 0,
          },
        }}
      >
        <MenuList
          sx={{
            border: 'none',
          }}
        >
          {isGenreLoading ? (
            <ListItemButton onClick={handleClick}>
              <ListItemText>
                {' '}
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </ListItemText>
            </ListItemButton>
          ) : (
            genreData?.data?.map((genre: any, index: number) => {
              return (
                <ListItemButton onClick={handleClick} key={index}>
                  <ListItemText>{genre?.name}</ListItemText>
                </ListItemButton>
              );
            })
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default GenreSection;
