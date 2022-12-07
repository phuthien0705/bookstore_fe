import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Typography,
} from '@mui/material';

import {
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
  IconAdjustments,
} from '@tabler/icons';
import config from '../../../config';
import authService from '../../../services/authService';
import checkIsAdminOrManager from '../../../common/checkIsAdminOrManager';
import { useRouter } from 'next/router';
import Badge from '@mui/material/Badge';

const ProfileSection: React.FunctionComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [userInfo, setUserInfo] = useState<any>({ name: '', roles: ['user'] });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    if (router.pathname.includes('/admin')) {
      router && router.push('/');
    }
    authService.logOut();
  };
  const handleClickLogin = () => {
    router && router.push('login');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event: any, route = '') => {
    handleClose();

    if (route && route !== '') {
      router.push(route);
    }
  };

  useEffect(() => {
    setUserInfo(authService.getUser());
  }, []);

  return (
    <div>
      <ButtonBase
        id="basic-base-button"
        onClick={handleClick}
        sx={{ borderRadius: '12px' }}
      >
        <Avatar
          variant="rounded"
          sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            width: '34px',
            height: '34px',
            fontSize: '1.2rem',
            transition: 'all .2s ease-in-out',
            background: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.primary.dark,
              color: theme.palette.primary.light,
            },
          }}
          color="inherit"
        >
          <IconSettings stroke={1.5} size="1.3rem" />
        </Avatar>
      </ButtonBase>
      <Menu
        id="menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-base-button',
        }}
      >
        {!authService.isAuthenticated() ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={<Typography variant="body2">Đăng nhập</Typography>}
            />
          </ListItemButton>
        ) : checkIsAdminOrManager(userInfo?.roles) ? (
          <MenuList sx={{ padding: 0 }}>
            <ListItemButton
              selected={router.pathname.includes('/admin')}
              onClick={(event) => handleListItemClick(event, '/admin/product')}
            >
              <ListItemIcon>
                <IconAdjustments stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Quản lý</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              selected={router.pathname.includes('/profile')}
              onClick={(event) => handleListItemClick(event, '/profile')}
            >
              <ListItemIcon>
                <IconSettings stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Cài đặt tài khoản</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đăng xuất</Typography>}
              />
            </ListItemButton>
          </MenuList>
        ) : (
          <MenuList>
            <ListItemButton
              selected={router.pathname.includes('/profile')}
              onClick={(event) => handleListItemClick(event, '/profile')}
            >
              <ListItemIcon>
                <IconSettings stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Cài đặt tài khoản</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đăng xuất</Typography>}
              />
            </ListItemButton>
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

export default ProfileSection;
