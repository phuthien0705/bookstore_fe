import { Paper, Container, Typography, Divider } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import MainCard from '../components/cards/MainCard';
import authService from '../services/authService';
import AccountTabs from '../components/profile/AccountTabs';
import { useState, useEffect } from 'react';
import useGetUserProfile from '@/hooks/client/useGetUserProfile';

const Profile = () => {
  const { data } = useGetUserProfile();

  return (
    <ProductLayout>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ backgroundColor: '#fff', p: 3, mt: 2, mb: 2 }}>
          <Typography variant="h3">Cài Đặt Tài Khoản</Typography>
        </Paper>
        <MainCard title={data && data?.name} darkTitle>
          <AccountTabs />
        </MainCard>
      </Container>
    </ProductLayout>
  );
};
export default Profile;
