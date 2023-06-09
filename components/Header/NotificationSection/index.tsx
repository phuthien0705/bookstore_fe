import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  ListItemButton,
  ListItemText,
  Menu,
  MenuList,
  Typography,
  useTheme,
} from '@mui/material';
import { IconBell } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import authService from '@/services/authService';
import useGetListOrder from '@/hooks/client/useGetListOrder';
import { SocketContext } from '@/socket/socket-context';
export default function NotificationSection() {
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { haveNoti, setHaveNoti } = useContext(SocketContext);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    haveNoti && setHaveNoti(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogin = () => {
    router && router.push({ pathname: '/login' });
  };
  const { data: orderData, isLoading } = useGetListOrder(page, 5);
  return (
    <Box
      sx={{
        ml: theme.spacing(1),
        mr: theme.spacing(1),
      }}
    >
      <ButtonBase
        onClick={handleClick}
        sx={{ borderRadius: '12px' }}
        className="shadow"
        id="notification-button"
      >
        <Badge badgeContent={haveNoti ? 1 : 0} color="primary">
          <Avatar
            variant="rounded"
            sx={{
              cursor: 'pointer',
              borderRadius: theme.spacing(1),
              width: theme.spacing(4.25),
              height: theme.spacing(4.25),
              fontSize: theme.spacing(2.4),
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
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </Badge>
      </ButtonBase>
      <Menu
        id="menu-noti"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
        }}
        PaperProps={{
          style: {
            width: '30ch',
          },
        }}
      >
        {isLoading ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  <CircularProgress />
                </Typography>
              }
            />
          </ListItemButton>
        ) : !authService.isAuthenticated() ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  {<FormattedMessage id="profileSection.login" />}
                </Typography>
              }
            />
          </ListItemButton>
        ) : (
          <MenuList sx={{ padding: 0 }}>
            {orderData &&
              orderData?.datas?.map((i: any, index: number) => (
                <>
                  <ListItemButton key={i?.id}>
                    {i?.status === 'pending' ? (
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            Đơn hàng <b>{i?.id}</b> đang được xử lý
                          </Typography>
                        }
                      />
                    ) : i?.status === 'canceled' ? (
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            Đơn hàng <b>{i?.id}</b> đã bị hủy
                          </Typography>
                        }
                      />
                    ) : (
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            Đơn hàng <b>{i?.id}</b> đã giao hàng thành công
                          </Typography>
                        }
                      />
                    )}
                  </ListItemButton>
                  {index !== orderData?.datas?.length - 1 && <Divider />}
                </>
              ))}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}
