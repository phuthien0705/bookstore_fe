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
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        rowGap: 2,
      }}
    >
      <Box>
        <ButtonBase
          sx={{
            display: 'flex',
            columnGap: 1,
            padding: '5px 10px',
            borderRadius: '8px',
          }}
        >
          <ArrowBackIcon />
          Tiếp tục mua hàng
        </ButtonBase>
      </Box>
      <Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Paper
            variant="outlined"
            sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
          >
            <InputBase
              placeholder="Coupon Code"
              sx={{ width: { xs: '100%', md: 350 }, ml: 2 }}
            />
            <Button variant="text" sx={{ width: '100px' }}>
              Áp dụng
            </Button>
          </Paper>

          <div style={{ width: '100%' }}>
            <Button
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
      </Box>
    </Stack>
  );
};

export default SubmitCart;
