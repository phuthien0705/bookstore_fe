import { Box, Container, Grid, Link, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoSection from '../LogoSection';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();
    return (
        <footer>
            <Box>
                <Box textAlign="center" mt={2}>
                    <LogoSection color="inherit" margin={2}></LogoSection>
                    <Stack direction="row" justifyContent="center" spacing={6} color="inherit" mt={4} mb={2}>
                        <Box>
                            <Link href="#" variant="h4" color="inherit" underline="none">
                                Dịch Vụ
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" variant="h4" color="inherit" underline="none">
                                Hỗ Trợ
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" variant="h4" color="inherit" underline="none">
                                Chính Sách
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" variant="h4" color="inherit" underline="none">
                                Liên Hệ
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/profile" variant="h4" color="inherit" underline="none">
                                Tài Khoản
                            </Link>
                        </Box>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={4} margin={2}>
                        <IconButton variant="contained" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton variant="contained" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton variant="contained" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton variant="contained" href="https://LinkedIn.com" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Box>
                <Box textAlign="center" pt={{ xs: 1, sm: 2 }} pb={{ xs: 2, sm: 0 }}>
                    <Typography color={theme.palette.info}>
                        &reg; {new Date().getFullYear()} Bảo Thư Bookstore. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
