import { FC, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const Logo: FC = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const redirectToHome = useCallback(() => {
    router && router.push('/');
  }, [router]);
  return (
    <h1
      onClick={() => redirectToHome()}
      style={{
        color: theme.palette.secondary.main,
        textDecoration: 'none',
      }}
    >
      BOXO
    </h1>
  );
};

export default Logo;
