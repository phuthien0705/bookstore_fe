import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';
import QuantityButton from 'components/extended/Quantity';
import { styled } from '@mui/material/styles';

const ImageStyle = styled('img')({ borderRadius: 4, objectFit: 'contain', margin: '5px 0', width: '100px', height: 'auto' });

const ItemTable = ({ items, setListItem, handleIncreaseQuantity, handleDecreaseQuantity, handleDelete }) => {
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
                    {items.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                    <Box>
                                        <ImageStyle alt={row.name} width="76" height="76" src={row.image} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6">{row.name}</Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="14px" fontWeight="semibold">
                                    {row.price}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <QuantityButton
                                    currentQuantity={row?.quantity}
                                    handleIncreaseQuantity={() => handleIncreaseQuantity(row?.id)}
                                    handleDecreaseQuantity={() => handleDecreaseQuantity(row?.id)}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="16px" fontWeight="bold">
                                    {row.price * row?.quantity}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <IconButton disableFocusRipple disableRipple onClick={() => handleDelete(row?.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ItemTable.propTypes = {
    items: PropTypes.any,
    setListItem: PropTypes.func,
    handleIncreaseQuantity: PropTypes.func,
    handleDecreaseQuantity: PropTypes.func,
    handleDelete: PropTypes.func
};

export default ItemTable;
