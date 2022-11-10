import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarContent = ({ handleClose, type, message }) => (
    <Alert onClose={() => handleClose()} severity={type ? type : 'success'} sx={{ width: '100%' }}>
        {message}
    </Alert>
);
SnackbarContent.propTypes = {
    handleClose: PropTypes.any,
    type: PropTypes.string,
    message: PropTypes.string
};
export default SnackbarContent;
