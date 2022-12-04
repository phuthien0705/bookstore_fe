import { Avatar, Box, ButtonBase } from '@mui/material';
import { IconShoppingCart } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const CartSection: React.FunctionComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();

  const handleClickCart = useCallback(() => {
    if (!router.pathname.includes('/cart')) {
      router.push('/cart');
    }
  }, [router]);

  return (
    <Box
      onClick={() => handleClickCart()}
      sx={{
        ml: 2,
        mr: 2,
        [theme.breakpoints.down('md')]: {
          mr: 2,
        },
      }}
    >
      <ButtonBase sx={{ borderRadius: '12px' }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
            },
          }}
          color="inherit"
        >
          <IconShoppingCart stroke={1.5} size="1.3rem" />
        </Avatar>
      </ButtonBase>
    </Box>
  );
};

export default CartSection;
