import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { maxWidth } from '@mui/system';

import PropTypes from 'prop-types';

const OrderSummary = ({ items }) => {
    let subsum = items.reduce((prev, curr) => prev + Number(curr.price) * curr.quantity, 1);
    return (
        <Paper elevation={2} sx={{ display: 'flex', width: 1720, m: 3 }}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1700 }} align="right">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography variant="h5">Order Summary</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Sub Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">{subsum}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Coupon Discount</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">-</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">Total</Typography>
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
