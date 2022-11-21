import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const NotFoundStyle = styled('div')({
    width: '100%',
    height: '100%'
});
const NotFoundPage = () => {
    return (
        <NotFoundStyle>
            <Typography>404</Typography>
            <Typography>404</Typography>
        </NotFoundStyle>
    );
};

export default NotFoundPage;
