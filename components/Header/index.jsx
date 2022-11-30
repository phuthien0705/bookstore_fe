import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography, Stack, Divider, Link, Container } from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { IconMenu2 } from '@tabler/icons';
import CartSection from './CartSection';

const Header = ({ handleLeftDrawerToggle, hideSidebarIcon = false, hideSearch = false, hideCart = false, hideNoti = false }) => {
    const theme = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <Box sx={{ flexGrow: 1 }} />
            <Stack>
                <Container sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            width: 120,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            [theme.breakpoints.down('md')]: {
                                width: 'auto'
                            }
                        }}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
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
                                            color: theme.palette.secondary.light
                                        }
                                    }}
                                    onClick={handleLeftDrawerToggle}
                                    color="inherit"
                                >
                                    <IconMenu2 stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ButtonBase>
                        )}
                    </Box>
                    {/* header search */}
                    {!hideSearch && <SearchSection />}
                    {/* notification & profile & cart */}
                    {!hideNoti && <NotificationSection />}
                    {!hideCart && <CartSection />}
                    <ProfileSection />
                </Container>
                <Container sx={{ display: 'flex', alignItems: 'flex-end', height: '40px', overflow: 'hidden' }}>
                    <Link href="#" underline="hover">
                        Best Seller
                    </Link>
                    <Divider style={{ width: '1%', borderColor: '#ffffff' }} />
                    <Link href="#" underline="hover">
                        Văn Học
                    </Link>
                    <Divider style={{ width: '1%', borderColor: '#ffffff' }} />
                    <Link href="#" underline="hover">
                        Sách Giáo Khoa
                    </Link>
                    <Divider style={{ width: '1%', borderColor: '#ffffff' }} />
                    <Link href="#" underline="hover">
                        Kinh Tế
                    </Link>
                    <Divider style={{ width: '1%', borderColor: '#ffffff' }} />
                    <Link href="#" underline="hover">
                        Tâm Lý - Kỹ Năng
                    </Link>
                    <Divider style={{ width: '25%', borderColor: '#ffffff' }} />
                    <Link href="#" underline="none" color="secondary">
                        Giới Thiệu
                    </Link>
                    <Divider style={{ width: '1%' }} />
                    <Link href="#" underline="none" color="secondary">
                        Tải Ứng Dụng
                    </Link>
                </Container>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    hideSidebarIcon: PropTypes.bool,
    hideSearch: PropTypes.bool,
    hideCart: PropTypes.bool,
    hideNoti: PropTypes.bool
};

export default Header;
