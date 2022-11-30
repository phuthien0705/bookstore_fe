import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { maxWidth } from '@mui/system';

const OrderSummary = ({ items }: { items: any }) => {
  const subsum = items.reduce(
    (prev: number, curr: any) =>
      Number(prev) + Number(curr.price) * Number(curr.quantity),
    0
  );
  return (
    <Paper
      sx={{
        display: 'flex',
        width: '100%',
        mt: 2,
        mb: 2,
        border: '1px solid rgba(0, 0, 0, 0.15)',
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1700 }} align="right">
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography fontSize="14px" fontWeight="bold">
                  Tổng tiền
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="16px" fontWeight="bold">
                  {subsum}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontSize="14px" fontWeight="bold">
                  Mã giảm
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="16px" fontWeight="bold">
                  -
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontSize="14px" fontWeight="bold">
                  Còn lại
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="16px" fontWeight="bold">
                  {subsum.toString()}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderSummary;
