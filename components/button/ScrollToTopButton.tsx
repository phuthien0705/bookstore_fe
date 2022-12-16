import { Button, Fab } from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton: React.FunctionComponent<any> = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <Button sx={{ width: 'fit-content', height: 'fit-content' }}>
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

export default ScrollToTopButton;
