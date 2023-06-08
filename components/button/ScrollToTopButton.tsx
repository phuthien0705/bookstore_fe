import { Button, Fab } from '@mui/material';
import { useEffect, useState, useCallback, memo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { scrollToTop } from '@/utils/scrollToTop';
import colors from './../../assets/scss/_themes-vars.module.scss';

const ScrollToTopButton: React.FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const color = colors;

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      !visible && setVisible(true);
    } else if (scrolled <= 300) {
      visible && setVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <Button
      variant="contained"
      sx={{ width: 'fit-content', height: 'fit-content' }}
    >
      <Fab
        onClick={scrollToTop}
        style={{
          display: visible ? 'flex' : 'none',
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.secondaryMain,
        }}
        color="secondary"
        size="small"
        aria-label="scroll back to top"
      >
        <ArrowUpwardIcon />
      </Fab>
    </Button>
  );
};

export default memo(ScrollToTopButton);
