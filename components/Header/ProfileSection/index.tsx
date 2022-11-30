import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Typography,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from '../../cards/MainCard';
import Transitions from '../../extended/Transitions';
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

const ProfileSection = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
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
    router.push('login');
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
      <Chip
        id="basic-chip"
        onClick={handleClick}
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={authService.isAuthenticated() ? '' : ''}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        aria-controls={open ? 'menu-profile' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="primary"
      />

      <Menu
        id="menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-chip',
        }}
      >
        {!authService.isAuthenticated() ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={<Typography variant="body2">Đăng nhập</Typography>}
            />
          </ListItemButton>
        ) : checkIsAdminOrManager(userInfo?.roles) ? (
          <MenuList>
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
