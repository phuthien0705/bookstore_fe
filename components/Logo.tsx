import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoIcon from '/assets/images/logo.png';
import { Box } from '@mui/material';

const Logo: React.FunctionComponent = () => {
  const router = useRouter();
  const redirectToHome = useCallback(() => {
    router && router.push('/');
  }, [router]);
  return (
    <Box onClick={() => redirectToHome()} sx={{ paddingTop: 1.5 }}>
      <Image src={logoIcon} alt="logo" width={100} height={40} />
    </Box>
  );
};

export default Logo;
