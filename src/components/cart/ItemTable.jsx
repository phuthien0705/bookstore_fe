import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import QuantityButton from 'components/extended/Quantity';

const ItemTable = ({ items }) => {
    const [isDeleted, setIsDeleted] = useState([]);

    const handleDelete = (index) => {
        setIsDeleted((prev) => [...prev, index]);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 1762 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5">Sản phẩm</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">Giá</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">Số lượng</Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography variant="h5">Tổng</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(
                        (row, index) =>
                            !isDeleted.includes(index) && (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                            <Grid item xs={2}>
                                                <img alt={row.name} width="76" height="76" src={row.image} />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="h6">{row.name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">{row.price}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <QuantityButton init={row.quantity} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">{row.price}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton disableFocusRipple disableRipple onClick={() => handleDelete(index)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ItemTable.propTypes = {
    items: PropTypes.any
};

export default ItemTable;
