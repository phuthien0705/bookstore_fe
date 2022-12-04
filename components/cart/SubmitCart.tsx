import {
  Grid,
  ButtonBase,
  Stack,
  Paper,
  InputBase,
  Button,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubmitCart = ({ setCurrentIndex }: { setCurrentIndex: Function }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="end"
      spacing={1}
    >
      <div>
        <Button
          sx={{ width: 'fit-content' }}
          variant="contained"
          fullWidth
          onClick={() => {
            setCurrentIndex((prev: any) => prev + 1);
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </Stack>
  );
};

export default SubmitCart;
