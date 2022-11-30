import { Paper, Container, Typography, Divider } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import MainCard from '../components/cards/MainCard';
import authService from '../services/authService';
import AccountTabs from '../components/profile/AccountTabs';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    setUserInfo(authService?.getUser() || null);
  }, []);
  return (
    <ProductLayout>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
          <Typography variant="h3">Cài Đặt Tài Khoản</Typography>
        </Paper>
        <MainCard
          title={
            authService.isAuthenticated() && (
              <Typography variant="h4"> {userInfo?.name}</Typography>
            )
          }
          darkTitle
        >
          <AccountTabs />
        </MainCard>
      </Container>
    </ProductLayout>
  );
};
export default Profile;
