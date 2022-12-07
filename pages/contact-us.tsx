import HomeLayout from '@/layout/HomeLayout';
import MainCard from '@/components/cards/MainCard';
import {
  Typography,
  Grid,
  Paper,
  Stack,
  Box,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import Image from 'next/image';
import LogosloganDf from '../assets/images/boxo/Logoslogan-df.png';
import LogosloganMd from '../assets/images/boxo/Logoslogan-md.png';
import { makeStyles } from '@mui/styles';
import CardMember from '@/components/cards/products/CardMember';

const ContactUs = () => {
  return (
    <>
      <HomeLayout>
        <MainCard title={<Typography variant="h2">Liên hệ</Typography>}>
          Policy
        </MainCard>
      </HomeLayout>
    </>
  );
};
export default ContactUs;
