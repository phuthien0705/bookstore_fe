import { Paper, Container, Typography, Divider } from '@mui/material';
import AccountTabs from 'components/profile/AccountTabs';
import authService from 'services/authService';
import MainCard from 'components/cards/MainCard';
const Profile = () => {
    return (
        <Container maxWidth="1rem" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
                <Typography variant="h3">Cài Đặt Tài Khoản</Typography>
            </Paper>
            <MainCard title={authService.isAuthenticated() && <Typography> {authService.getUser()?.name}</Typography>} darkTitle>
                <AccountTabs />
            </MainCard>
        </Container>
    );
};
export default Profile;
