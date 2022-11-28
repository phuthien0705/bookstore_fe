import { CircularProgress, Container } from '@mui/material';

const LoadingScreen = () => {
    return (
        <Container
            disableGutters
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            <CircularProgress />
        </Container>
    );
};
export default LoadingScreen;
