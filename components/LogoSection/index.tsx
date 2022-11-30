import { ButtonBase } from '@mui/material';
import config from '../../config';
import Link from 'next/link';
import Logo from '../Logo';

const LogoSection = () => (
  <Link href="/">
    <ButtonBase>
      <Logo />
    </ButtonBase>
  </Link>
);

export default LogoSection;
