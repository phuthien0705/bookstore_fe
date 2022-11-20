import { useState, useRef, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import User1 from 'assets/images/users/default-avatar.png';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser, IconAdjustments } from '@tabler/icons';
import config from 'config';
import authService from 'services/authService';
import checkIsAdminOrManager from 'common/checkIsAdminOrManager';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleLogout = async () => {
        authService.logOut();
        setOpen(false);
    };
    const handleClickLogin = () => {
        navigate('login');
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, route = '') => {
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <Chip
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
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={authService.isAuthenticated() && User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                width: '12rem',
                                overflow: 'hidden',
                                filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))'
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    sx={{ overflow: 'hidden' }}
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    {authService.isAuthenticated() && (
                                        <Box sx={{ p: '1rem 1rem 0 1rem', overflow: 'hidden', fontSize: '14px' }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">Chào,</Typography>
                                                    <Typography
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontWeight: 400
                                                        }}
                                                        component="span"
                                                        variant="h4"
                                                    >
                                                        {authService.getUser()?.name}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    )}

                                    <Box
                                        sx={{
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                overflow: 'hidden',
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {}
                                            }}
                                        >
                                            {!authService.isAuthenticated() ? (
                                                <ListItemButton selected={false} onClick={handleClickLogin}>
                                                    <ListItemText primary={<Typography variant="body2">Đăng nhập</Typography>} />
                                                </ListItemButton>
                                            ) : checkIsAdminOrManager(authService?.getUser()?.roles) ? (
                                                <>
                                                    <ListItemButton
                                                        selected={location.pathname.includes('/admin')}
                                                        onClick={(event) => handleListItemClick(event, '/admin/product')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconAdjustments stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Quản lý</Typography>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        selected={location.pathname.includes('/profile')}
                                                        onClick={(event) => handleListItemClick(event, '/profile')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography variant="body2">Cài đặt tài khoản</Typography>}
                                                        />
                                                    </ListItemButton>
                                                    <ListItemButton selected={false} onClick={handleLogout}>
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Đăng xuất</Typography>} />
                                                    </ListItemButton>
                                                </>
                                            ) : (
                                                <>
                                                    <ListItemButton
                                                        selected={location.pathname.includes('/profile')}
                                                        onClick={(event) => handleListItemClick(event, '/profile')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography variant="body2">Cài đặt tài khoản</Typography>}
                                                        />
                                                    </ListItemButton>
                                                    <ListItemButton selected={false} onClick={handleLogout}>
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Đăng xuất</Typography>} />
                                                    </ListItemButton>
                                                </>
                                            )}
                                        </List>
                                    </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
