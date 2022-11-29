import { Paper, Container, Typography, Divider } from '@mui/material';
import ProductLayout from './../layout/ProductLayot/index';
import MainCard from './../components/cards/MainCard';
import authService from './../services/authService';
import AccountTabs from './../components/profile/AccountTabs';

const Profile = () => {
    return (
        <ProductLayout>
            <Container maxWidth="1rem" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
                    <Typography variant="h3">Cài Đặt Tài Khoản</Typography>
                </Paper>
                <MainCard
                    title={authService.isAuthenticated() && <Typography variant="h4"> {authService.getUser()?.name}</Typography>}
                    darkTitle
                >
                    <AccountTabs />
                </MainCard>
            </Container>
        </ProductLayout>
    );
};
export default Profile;
