import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { maxWidth } from '@mui/system';

import PropTypes from 'prop-types';

const OrderSummary = ({ items }) => {
    let subsum = items.reduce((prev, curr) => prev + Number(curr.price) * curr.quantity, 1);
    return (
        <Paper sx={{ display: 'flex', width: '100%', mt: 2, mb: 2, border: '1px solid rgba(0, 0, 0, 0.15)' }}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1700 }} align="right">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography variant="h5">Tổng</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Tổng tiền</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">{subsum}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Mã giảm</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">-</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">Còn lại</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">{subsum.toString()}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

OrderSummary.propTypes = {
    items: PropTypes.any
};

export default OrderSummary;
