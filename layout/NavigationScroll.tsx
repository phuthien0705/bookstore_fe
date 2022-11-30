import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const NavigationScroll = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [router.pathname]);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node,
};

export default NavigationScroll;
