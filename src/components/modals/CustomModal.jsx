import { Box, Button, Dialog, DialogTitle, Drawer, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ children, handleClose, open, title }) => {
    const matches = useMediaQuery('(min-width:768px)');
    return matches ? (
        <Dialog onClose={() => handleClose()} open={open}>
            <Stack direction="column" sx={{ padding: 2 }} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="20px">
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>{children}</Box>
            </Stack>
        </Dialog>
    ) : (
        <Drawer
            open={open}
            anchor="bottom"
            onClose={() => handleClose()}
            PaperProps={{
                square: false,
                style: {
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px'
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                <Typography fontWeight="bold" fontSize="20px">
                    {title}
                </Typography>
                <IconButton
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: 2 }}>{children}</Box>
        </Drawer>
    );
};
CustomModal.propTypes = {
    children: PropTypes.any,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string
};
export default CustomModal;
