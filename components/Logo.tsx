import { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
// import Image from 'next/image';

// import logoIcon from '@assets/images/logo.png';

const Logo: React.FunctionComponent = () => {
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
    // <Image src={logoIcon} alt="logo" width={50} height={50} />
  );
};

export default Logo;
