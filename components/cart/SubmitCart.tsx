import { ISubmitCart } from '@/interfaces/compontents/cart.interface';
import { Stack, Button, Container, Box, Typography } from '@mui/material';

const SubmitCart: React.FunctionComponent<ISubmitCart> = ({
  currentIndex,
  setCurrentIndex,
  items,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        padding: '16px',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

        '::before': {
          content: '""',
          position: 'absolute',
          top: '-1.25rem',
          left: 0,
          height: '1.25rem',
          width: '100%',
          background: 'linear-gradient(transparent,rgba(0,0,0,.06))',
        },
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Stack
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction="row" spacing={2}>
            <Typography
              sx={{ fontWeight: 600, fontSize: '20px', color: '#ee4d2d' }}
            >
              Tổng tiền:
            </Typography>
            <Typography
              sx={{ fontWeight: 500, fontSize: '20px', color: '#ee4d2d' }}
            >
              {items.reduce(
                (prev: number, curr: any) =>
                  curr.is_checked === 1
                    ? Number(prev) + Number(curr.price) * Number(curr.quantity)
                    : Number(prev) + 0,
                0
              ) || 0}
              đ
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Button
              sx={{ display: currentIndex === 0 ? 'none' : 'block' }}
              onClick={() => {
                setCurrentIndex((prev: any) => prev - 1);
              }}
            >
              Quay lại
            </Button>
            <Button
              disabled={items?.every((item: any) => item?.is_checked == false)}
              sx={{ width: 'fit-content' }}
              variant="contained"
              fullWidth
              onClick={() => {
                if (currentIndex === 0) {
                  setCurrentIndex((prev: any) => prev + 1);
                } else {
                  alert('ban da thanh toan');
                }
              }}
            >
              {currentIndex === 0 ? 'Tiếp theo' : 'Thanh toán'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubmitCart;
