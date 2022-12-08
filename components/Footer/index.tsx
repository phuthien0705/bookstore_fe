import {
  Box,
  Container,
  Paper,
  Link,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoSection from '../LogoSection';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e3f2fd',
      }}
    >
      <Box sx={{ backgroundColor: '#fff', p: 1, mt: 2 }}>
        <Box textAlign="center" mt={2}>
          <LogoSection />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={6}
            color="inherit"
            mt={1}
            mb={1}
          >
            <Box>
              <Stack direction="column" spacing={1}>
                <Link variant="h4" color="inherit" underline="none">
                  Dịch Vụ
                </Link>
                <Link
                  href='use-term'
                  justifyContent="center"
                  underline='none'
                  sx={{
                    display: 'flex',
                    '&:hover': {
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  Điều khoản sử dụng
                </Link>
                <Link
                  href='pay-term'
                  underline='none'
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    '&:hover': {
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  Chính sách bảo mật thanh toán
                </Link>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column" spacing={1}>
                <Link variant="h4" color="inherit" underline="none">
                  Hỗ Trợ
                </Link>
                <Link
                  href='trans-term'
                  underline='none'
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    '&:hover': {
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  Chính sách vận chuyển
                </Link>
              </Stack>
            </Box>
            <Box>
              <Link href="#" variant="h4" color="inherit" underline="none">
                Liên Hệ
              </Link>
            </Box>
            <Box>
              <Link
                href="/profile"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Tài Khoản
              </Link>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={4} margin={1}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box textAlign="center" pt={{ xs: 1, sm: 2 }} pb={{ xs: 2, sm: 0 }}>
          <Typography color={theme.palette.info}>
            &reg; {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH
            BOXO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
