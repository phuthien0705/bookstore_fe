// material-ui
import { Typography, List, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NavItem from './NavItem';
import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const MenuList = () => {
    const listItem = [
        {
            title: 'Tất cả sản phẩm',
            url: '/product',
            icon: icons.IconDashboard
        }
    ];
    const theme = useTheme();

    return (
        <>
            <List
                subheader={
                    <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                        Doanh mục
                    </Typography>
                }
            >
                <NavItem item={listItem[0]} level={1} />
            </List>
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

export default MenuList;
